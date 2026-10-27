from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import pandas as pd
import numpy as np
import requests

app = FastAPI(title="Car AI Recommendation Engine", version="1.0")

# Enable CORS for React frontend & Spring Boot backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SPRING_BOOT_CAR_API = "http://localhost:8080/api/cars"

class UserPreferenceRequest(BaseModel):
    min_budget: float = Field(0.0, description="Minimum price in INR Lakhs")
    max_budget: float = Field(100.0, description="Maximum price in INR Lakhs")
    preferred_brand: Optional[str] = Field(None, description="Preferred car brand")
    fuel_type: Optional[str] = Field(None, description="Preferred fuel type (Petrol, Diesel, Electric, Hybrid)")
    min_mileage: float = Field(0.0, description="Minimum mileage in km/l")

class RecommendedCarResponse(BaseModel):
    id: str
    brand: str
    model: str
    year: int
    price: float
    fuelType: str
    mileage: float
    matchPercentage: float

def fetch_cars_from_backend():
    try:
        response = requests.get(SPRING_BOOT_CAR_API, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        # Fallback dummy data if Spring Boot is offline during testing
        return [
            {"id": "1", "brand": "Hyundai", "model": "Creta", "year": 2023, "price": 14.5, "fuelType": "Petrol", "mileage": 18.0, "isAvailable": True},
            {"id": "2", "brand": "Hyundai", "model": "Venue", "year": 2023, "price": 10.2, "fuelType": "Petrol", "mileage": 19.5, "isAvailable": True},
            {"id": "3", "brand": "Hyundai", "model": "Verna", "year": 2024, "price": 12.8, "fuelType": "Petrol", "mileage": 18.6, "isAvailable": True},
            {"id": "4", "brand": "Tata", "model": "Nexon EV", "year": 2024, "price": 16.0, "fuelType": "Electric", "mileage": 300.0, "isAvailable": True},
            {"id": "5", "brand": "Toyota", "model": "Urban Cruiser", "year": 2022, "price": 11.5, "fuelType": "Hybrid", "mileage": 22.0, "isAvailable": True}
        ]

@app.post("/api/recommend", response_model=List[RecommendedCarResponse])
def recommend_cars(pref: UserPreferenceRequest):
    cars_data = fetch_cars_from_backend()

    if not cars_data:
        raise HTTPException(status_code=444, detail="No car inventory found.")

    df = pd.DataFrame(cars_data)

    # Filter out unavailable cars
    if 'isAvailable' in df.columns:
        df = df[df['isAvailable'] == True]

    if df.empty:
        return []

    scores = []

    for _, car in df.iterrows():
        score = 0.0
        max_score = 100.0

        # 1. Price Budget Match (35 Points)
        price = car['price']
        if pref.min_budget <= price <= pref.max_budget:
            score += 35.0
        else:
            # Partial penalty based on deviation
            deviation = min(abs(price - pref.min_budget), abs(price - pref.max_budget))
            score += max(0.0, 35.0 - (deviation * 5.0))

        # 2. Brand Match (25 Points)
        if pref.preferred_brand and pref.preferred_brand.strip():
            if str(car['brand']).strip().lower() == pref.preferred_brand.strip().lower():
                score += 25.0

        # 3. Fuel Type Match (25 Points)
        if pref.fuel_type and pref.fuel_type.strip():
            if str(car['fuelType']).strip().lower() == pref.fuel_type.strip().lower():
                score += 25.0

        # 4. Mileage Match (15 Points)
        if car['mileage'] >= pref.min_mileage:
            score += 15.0
        else:
            if pref.min_mileage > 0:
                score += max(0.0, 15.0 * (car['mileage'] / pref.min_mileage))

        scores.append(round(score, 1))

    df['matchPercentage'] = scores

    # Sort by match percentage descending
    recommended_df = df.sort_values(by='matchPercentage', ascending=False)

    # Return top recommendations
    return recommended_df.to_dict(orient='records')