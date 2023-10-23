import { db } from "$lib/db";
import { airports } from "$lib/db/schema";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    //get search params and do basic turnary null evaluation
    let start = url.searchParams.get("start") ? Number(url.searchParams.get("start")) : 1;
    let limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;

    //Get length of airports table
    const count = await db.select({ count: sql`COUNT(*)` }).from(airports);

    //Validate params
    if (Number.isNaN(start) || start < 1) {
        start = 1;
    }
    if (Number.isNaN(limit) || limit < 5) {
        limit = 10;
    }
    if (limit > 50) {
        limit = 50;
    }

    //Query database for selection
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