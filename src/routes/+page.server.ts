import { db } from '$lib/db';
import { airports, flights } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		flights: await db.select().from(flights).limit(10),
		airports: await db.select().from(airports).limit(10)
	};
};