import { db } from '$lib/db';
import { airports, flights } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		flights: await db.select().from(flights).limit(10),
		airports: await db.select().from(airports).limit(10),
		allAirports: await db.select().from(airports),
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const from = formData.get("from")?.valueOf();
		const to = formData.get("to")?.valueOf();

		throw redirect(302, `/flights?from=${from}&to=${to}`);
	}
} satisfies Actions;