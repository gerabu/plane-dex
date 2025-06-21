import type { AircraftProvider } from "~/domain/aircraft/aircraft.provider";
import type { Aircraft } from "~/domain/aircraft/aircraft.types";
import { getBoundingBox, getDistanceKm } from "~/utils/geo";

const MAX_DISTANCE_KM = 20;

export const OpenSkyAdapter: AircraftProvider = {
  async getNearbyAircraft(lat, lon) {
    const { lamin, lamax, lomin, lomax } = getBoundingBox(lat, lon, 1.5);

      const url = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.states) return [];

      const aircraft: Aircraft[] = data.states.map((s: any[]) => ({
        icao24: s[0],
        callsign: s[1]?.trim(),
        originCountry: s[2],
        latitude: s[6],
        longitude: s[5],
        baroAltitude: s[7],
        velocity: s[9],
      }));

      // Filtro simple por altitud, callsign y distancia
      return aircraft.filter(
        (a: Aircraft) =>
          a.latitude &&
          a.longitude &&
          a.baroAltitude !== null &&
          a.callsign &&
          getDistanceKm(lat, lon, a.latitude, a.longitude) < MAX_DISTANCE_KM,
      );
  },
};
