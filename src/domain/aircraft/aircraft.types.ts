export interface Aircraft {
  icao24: string;
  callsign: string;
  originCountry: string;
  latitude: number;
  longitude: number;
  baroAltitude: number;
  velocity: number;
  registration?: string;
  model?: string;
  operator?: string;
}
