import { z } from "zod";
import { OpenSkyAdapter } from "~/infrastructure/api/opensky.adapter";
import {
    createTRPCRouter,
    publicProcedure
} from "~/server/api/trpc";

export const radarRouter = createTRPCRouter({
  getNearby: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lon: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const aircraft = await OpenSkyAdapter.getNearbyAircraft(
        input.lat,
        input.lon,
      );
      return aircraft;
    }),
});
