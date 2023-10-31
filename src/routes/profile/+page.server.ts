import { db } from "$lib/db";
import { flights, passengers } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent();
    if (!user) throw redirect(302, "/");
    return {
        flights: await db.select({
            destination: flights.destination,
            origin: flights.origin,
            duration: flights.duration,
            id: flights.id
        })
        .from(passengers)
        .where(eq(passengers.user_id, user.userId))
        .leftJoin(flights, eq(flights.id, passengers.flight_id))
    }
}