import { db } from "$lib/db";
import { airports, arrivals, departures, flights } from "$lib/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    return {
        airport: (await db.select()
        .from(airports)
        .where(eq(airports.code, params.code)))[0],
        arrivals: await db.select({
            from: airports,
            flightData: flights
        })
        .from(arrivals)
        .where(eq(arrivals.airport_code, params.code))
        .leftJoin(flights, eq(flights.id, arrivals.flight_id))
        .leftJoin(airports, eq(airports.code, flights.origin)),
        departures: await db.select({
            to: airports,
            flightData: flights
        })
        .from(departures)
        .where(eq(departures.airport_code, params.code))
        .leftJoin(flights, eq(flights.id, departures.flight_id))
        .leftJoin(airports, eq(airports.code, flights.destination))
    }
}