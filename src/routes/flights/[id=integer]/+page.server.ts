import { db } from "$lib/db";
import { airports, flights, passengers, user } from "$lib/db/schema";
import { eq, or } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const id = Number(params.id);

    const rows = await db
    .select()
    .from(flights)
    .where(eq(flights.id, id))
    .leftJoin(airports, or(eq(flights.origin, airports.code), eq(flights.destination, airports.code)));

    const result = () => {
        return {
            id: rows[0].flights.id,
            duration: rows[0].flights.duration,
            origin: rows[0].airports,
            destination: rows[1].airports,
        }
    }

    return {
        flight: result(),
        passengers: await db
        .select({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
        .from(passengers)
        .where(eq(passengers.flight_id, id))
        .leftJoin(user, eq(passengers.user_id, user.id))
    }
}

export const actions = {
    default: async ({ params, locals }) => {
        const id = Number(params.id);
        const user = await locals.auth.validate();
        if (!user) {
            return;
        }

        await db.insert(passengers).values({
            flight_id: id,
            user_id: user.user.userId
        });
        return {
            success: true,
        }
    }
} satisfies Actions;