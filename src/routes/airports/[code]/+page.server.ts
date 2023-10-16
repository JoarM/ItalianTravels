import { db } from "$lib/db";
import { airports } from "$lib/db/schema";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
    return {
        airport: (await db.select().from(airports).where(eq(airports.code, params.code)))[0],
    }
}