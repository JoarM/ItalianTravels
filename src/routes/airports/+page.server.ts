import { db } from "$lib/db";
import { airports } from "$lib/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    let start = url.searchParams.get("start") ? Number(url.searchParams.get("start")) : 1;
    let limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;
    const count = await db.select({ count: sql`COUNT(*)` }).from(airports);
    if (Number.isNaN(start) || start < 1) {
        start = 1;
    }
    if (Number.isNaN(limit) || limit < 5) {
        limit = 10;
    }
    if (limit > 50) {
        limit = 50;
    }

    const result = await db.select()
    .from(airports)
    .offset((start - 1) * limit)
    .limit(limit);

    return {
        airportCount: count[0].count as number,
        limit: limit,
        start: start,
        airports: result
    }
}