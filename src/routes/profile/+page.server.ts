import { db } from "$lib/db";
import { flights, passengers } from "$lib/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
    const { user } = await parent();
    if (!user) throw redirect(302, "/");

    return {
        flights: await db.select().from(flights)
        .where(sql`${flights.id} in (select ${passengers.flight_id} from ${passengers} where ${passengers.user_id} = ${user.userId})`),
    }
}