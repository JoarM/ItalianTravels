import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

export const POST: RequestHandler = async ({ locals, url }) => {
    const session = await locals.auth.validate();
    let previous = url.searchParams.get("previous");
    previous = previous ? previous.slice(1) : "";
    if (!session) {
        throw redirect(302, previous);
    }

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);

    throw redirect(302, "/" + previous);
}