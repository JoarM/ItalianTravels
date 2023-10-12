import { db } from "$lib/db";
import { airports, flights, passengers, user } from "$lib/db/schema";
import { and, eq, or } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, parent }) => {
    const id = Number(params.id);
    const { user: currentUser } = await parent();

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

    const queryPassengers = await db
    .select({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    })
    .from(passengers)
    .where(eq(passengers.flight_id, id))
    .leftJoin(user, eq(passengers.user_id, user.id));

    const userOnFlight = queryPassengers.find((passenger) => passenger.email === currentUser?.email);

    return {
        flight: result(),
        passengers: queryPassengers,
        userOnFlight: userOnFlight,
    }
}

export const actions = {
    book: async ({ params, locals }) => {
        const id = Number(params.id);
        const user = await locals.auth.validate();
        if (!user) {
            return fail(400, {
                message: "You need to be logged in to book a flight",
            });
        }

        try {
            await db.insert(passengers).values({
                flight_id: id,
                user_id: user.user.userId
            });
        } catch (error: any) {
            if (error.code = "ER_DUP_ENTRY") {
                return fail(400, {
                    message: "You are already on this fligth",
                });
            }
            return fail(500, {
                message: "An unkown error occured",
            });
        }
        
        return {
            success: "You are now booked for this flight",
        }
    },
    unbook: async ({ params, locals }) => {
        const id = Number(params.id);
        const user = await locals.auth.validate();
        if (!user) {
            return fail(400, {
                message: "You need to be logged in to unbook a flight",
            });
        }

        try {
            await db.delete(passengers).where(and(eq(passengers.flight_id, id), eq(passengers.user_id, user.user.userId)));
        } catch (error) {
            return fail(500, {
                message: "An unkown error occured",
            });
        }
        
        return {
            success: "You have been unbooked from the flight",
        }
    }
} satisfies Actions;