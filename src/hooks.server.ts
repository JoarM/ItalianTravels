import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

//Hook for authentication
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};