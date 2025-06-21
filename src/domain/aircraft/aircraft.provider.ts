import type { Aircraft } from "./aircraft.types";

export interface AircraftProvider {
  getNearbyAircraft(lat: number, lon: number): Promise<Aircraft[]>;
}
