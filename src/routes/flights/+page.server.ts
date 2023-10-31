import { db } from '$lib/db';
import { flights } from '$lib/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    //Get search params with turnary null check
    let start = url.searchParams.get("start") ? Number(url.searchParams.get("start")) : 1;
    let limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");


    //Get table length
    const count = await db.select({ count: sql`COUNT(*)` }).from(flights);

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

	return {
		flights: await db.select()
        .from(flights)
        .offset((start - 1) * limit)
        .limit(limit)
        .where(and(eq(flights.origin, from ? from : flights.origin), eq(flights.destination, to ? to : flights.destination))),
        flightCount: count[0].count as number,
        limit: limit,
        start: start,
        from: from ? from : "",
        to: to ? to : ""
	};
}