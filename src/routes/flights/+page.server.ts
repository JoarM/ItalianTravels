import { db } from '$lib/db';
import { flights } from '$lib/db/schema';
import { sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
    let start = request.url.searchParams.get("start") ? Number(request.url.searchParams.get("start")) : 0;
    let limit = request.url.searchParams.get("limit") ? Number(request.url.searchParams.get("limit")) : 10;
    const count = await db.select({ count: sql`COUNT(*)` }).from(flights);
    if (Number.isNaN(start)) {
        start = 0;
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
	};
}