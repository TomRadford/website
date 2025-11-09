"use server";

import { COLOS, type ColoCode, type ColoData } from "../constants/colos";

// 1. Original object - O(1) lookup by airport code (already optimal)
// Usage: colos['AAE'] or colos.AAE
export const colosByCode = COLOS;

// 2. Map structure - Also O(1) lookup, but no performance advantage over object
// Use Map only if you need: guaranteed insertion order, iteration, or Map-specific methods
// Usage: colosMap.get('AAE')
export const colosMap = new Map<ColoCode, ColoData>(
  Object.entries(COLOS) as [ColoCode, ColoData][],
);

// 3. Indexed by region - O(1) lookup, then filter
export const colosByRegion = new Map<string, ColoCode[]>();
for (const [code, data] of colosMap) {
  const region = data.region;
  if (!colosByRegion.has(region)) {
    colosByRegion.set(region, []);
  }
  colosByRegion.get(region)!.push(code);
}

// 4. Indexed by country - O(1) lookup, then filter
export const colosByCountry = new Map<string, ColoCode[]>();
for (const [code, data] of colosMap) {
  const country = data.country;
  if (!colosByCountry.has(country)) {
    colosByCountry.set(country, []);
  }
  colosByCountry.get(country)!.push(code);
}

// 5. Indexed by country code (cca2) - O(1) lookup
export const colosByCca2 = new Map<string, ColoCode[]>();
for (const [code, data] of colosMap) {
  const cca2 = data.cca2;
  if (!colosByCca2.has(cca2)) {
    colosByCca2.set(cca2, []);
  }
  colosByCca2.get(cca2)!.push(code);
}

// 6. Indexed by city - O(1) lookup, then filter
export const colosByCity = new Map<string, ColoCode[]>();
for (const [code, data] of colosMap) {
  const city = data.city;
  if (!colosByCity.has(city)) {
    colosByCity.set(city, []);
  }
  colosByCity.get(city)!.push(code);
}

// 7. All colos as array - for iteration/filtering
export const colosArray = Array.from(colosMap.entries()).map(([code, data]) => ({
  code,
  ...data,
}));

// Helper functions for common lookups
export function getColoByCode(code: ColoCode): ColoData | undefined {
  return COLOS[code];
}

export function getColosByRegion(region: string): ColoData[] {
  const codes = colosByRegion.get(region) || [];
  return codes.map((code) => COLOS[code]);
}

export function getColosByCountry(country: string): ColoData[] {
  const codes = colosByCountry.get(country) || [];
  return codes.map((code) => COLOS[code]);
}

export function getColosByCca2(cca2: string): ColoData[] {
  const codes = colosByCca2.get(cca2) || [];
  return codes.map((code) => COLOS[code]);
}

export function getColosByCity(city: string): ColoData[] {
  const codes = colosByCity.get(city) || [];
  return codes.map((code) => COLOS[code]);
}

// Geographic distance calculation (Haversine formula)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find nearest colos to a point
export function findNearestColos(
  lat: number,
  lon: number,
  limit: number = 10,
): Array<{ code: ColoCode; data: ColoData; distance: number }> {
  return colosArray
    .map(({ code, ...data }) => ({
      code,
      data: data as ColoData,
      distance: calculateDistance(lat, lon, data.lat, data.lon),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

// Search by name (fuzzy search)
export function searchColos(query: string): ColoData[] {
  const lowerQuery = query.toLowerCase();
  return colosArray
    .filter(
      ({ code, ...data }) =>
        code.toLowerCase().includes(lowerQuery) ||
        data.name.toLowerCase().includes(lowerQuery) ||
        data.city.toLowerCase().includes(lowerQuery) ||
        data.country.toLowerCase().includes(lowerQuery),
    )
    .map(({ code, ...data }) => data as ColoData);
}
