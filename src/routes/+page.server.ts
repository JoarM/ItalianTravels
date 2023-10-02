import { db } from '$lib/db';
import { flights } from '$lib/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		flights: await db.select().from(flights)
	};
};