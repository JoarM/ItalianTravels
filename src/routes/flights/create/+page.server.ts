import { db } from "$lib/db";
import { airports, arrivals, departures, flights, insertFlightSchema } from "$lib/db/schema";
import { or, sql } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    return {
        airports: db.select().from(airports),
    }
}

export const actions =  {
    default: async ({ request }) => {
        const formData = await request.formData();

        const origin = formData.get("origin")?.valueOf();
        const destination = formData.get("destination")?.valueOf();
        const duration = Number(formData.get("duration")?.valueOf());
        
        if (typeof origin != "string" ||typeof destination != "string" || destination === "" || origin === "") {
            return fail(400, {
                message: "Inccorect airport code",
            });
        }

        const parse = await insertFlightSchema.safeParseAsync({
            origin: JSON.parse(origin),
            destination: JSON.parse(destination),
            duration: duration,
        });

        if (!parse.success || origin === destination) {
            return fail(400, {
                message: "Please select two unique airports and enter a the duration as an integer value in minutes",
            });
        }
        
        try {
            const create = await db.insert(flights).values({
                duration: duration,
                origin: JSON.parse(origin),
                destination: JSON.parse(destination)
            });

            await db.insert(departures).values({
                airport_code: JSON.parse(origin),
                flight_id: create[0].insertId,
            });

            await db.insert(arrivals).values({
                airport_code: JSON.parse(destination),
                flight_id: create[0].insertId,
            });
        } catch (error) {
            console.log(error);
            return fail(500, {
                message: "An unexpected error occured",
            });
        }

        return {
            success: true,
        }
    }
} satisfies Actions;