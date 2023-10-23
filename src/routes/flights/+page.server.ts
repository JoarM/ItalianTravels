import { db } from '$lib/db';
import { flights } from '$lib/db/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    //Get search params with turnary null check
    let start = url.searchParams.get("start") ? Number(url.searchParams.get("start")) : 1;
    let limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;

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
		flights: await db.select().from(flights).offset((start - 1) * limit).limit(limit),
        flightCount: count[0].count as number,
        limit: limit,
        start: start,
	};
}