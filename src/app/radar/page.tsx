"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export default function RadarPage() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );

  const { data, isLoading } = api.radar.getNearby.useQuery(location!, {
    enabled: !!location,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  if (!location) return <p>Getting location...</p>;
  if (isLoading) return <p>Loading aircraft...</p>;

  return (
    <main className="flex items-center justify-center p-8">
      <div className="card bg-base-100 w-96 shadow-sm">
        <ul className="list rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
            Nearby Aircraft
          </li>
          {data?.map((aircraft) => (
            <li key={aircraft.icao24} className="list-row">
              <div>
                <Image
                  className="rounded-box size-10"
                  src="https://cdn.jetphotos.com/full/5/1099437_1747972832.jpg"
                  alt={`Picture of ${aircraft.icao24}`}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div>{aircraft.callsign || "Unknown"}</div>
                <div className="text-xs font-semibold uppercase opacity-60">
                  {aircraft.originCountry}
                </div>
              </div>
              <button className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
