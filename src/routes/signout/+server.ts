import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

export const POST: RequestHandler = async ({ locals, url }) => {
    //Make sure user is logged in
    const session = await locals.auth.validate();

    //Get searchparams
    let previous = url.searchParams.get("previous");
    //Turnary to set the string to empty or remove first char
    previous = previous ? previous.slice(1) : "";
    if (!session) {
        //Redirect user
        throw redirect(302, "/" + previous);
    }

    //Logout user
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);

    //Redirect user
    throw redirect(302, "/" + previous);
}