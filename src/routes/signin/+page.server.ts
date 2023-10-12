import { signinSchema } from "$lib/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";

export const actions = {
    default: async ({ request, locals, url }) => {
        const formData = await request.formData();
        const email = formData.get("email")?.valueOf();
        const password = formData.get("password")?.valueOf();

        const parse = await signinSchema.safeParseAsync({
            email,
            password
        });

        if (!parse.success) {
            return fail(400, {
                message: "Incorrect email or password"
            });
        }

        if (email === undefined || password === undefined) {
            return fail(400, {
                message: "Incorrect email or password"
            });
        }

        try {
            const key = await auth.useKey("email", email.toString().toLowerCase(), password.toString());
            
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            
            locals.auth.setSession(session);
        } catch (error: any) {
            if (
				error instanceof LuciaError &&
				(error.message === "AUTH_INVALID_KEY_ID" ||
					error.message === "AUTH_INVALID_PASSWORD")
			) {
				return fail(400, {
					message: "Incorrect email or password"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
        }

        let previous = url.searchParams.get("previous");
        previous = previous ? previous.slice(1) : "";

        throw redirect(302, "/" + previous);
    }
} satisfies Actions