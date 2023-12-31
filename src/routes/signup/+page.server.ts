import { insertUserSchema } from "$lib/db/schema";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { auth } from "$lib/server/lucia";

export const actions = {
    default: async ({ request, locals, url }) => {
        //Get formdata
        const formdata = await request.formData();
        const firstname = formdata.get("firstname")?.valueOf();
        const lastname = formdata.get("lastname")?.valueOf();
        const email = formdata.get("email")?.valueOf();
        const password = formdata.get("password")?.valueOf();

        //Parse formdata
        const parse = await insertUserSchema.safeParseAsync({
            firstname,
            lastname,
            email,
            password
        });

        if (!parse.success) {
            const errors = parse.error.flatten().fieldErrors;
            return fail(400, {
                errors
            });
        }

        if (email === undefined 
        || password === undefined
        || firstname === undefined
        || lastname === undefined
        || email === undefined
        ) {
            return fail(400, {
                message: "You fucked up"
            });
        }

        try {
            //Create user
            const user = await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: email.toString().toLowerCase(),
                    password: password.toString()
                },
                attributes: {
                    firstname: firstname.toString(),
                    lastname: lastname.toString(),
                    email: email.toString()
                }
            });

            //Login user
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            });

            locals.auth.setSession(session);
        } catch (error: any) {
            //Check for known errors or return unknown error
            if (error.code === "ER_DUP_ENTRY") {
                return fail(400, {
                    message: "An account with this email already exists",
                });
            }

            return fail(500, {
				message: "An unknown error occurred",
			});
        }

        //Get search param
        let previous = url.searchParams.get("previous");
        //Turnary to set the string to empty or remove first char
        previous = previous ? previous.slice(1) : "";

        //Redirect user
        throw redirect(302, "/" + previous);
    }
} satisfies Actions;