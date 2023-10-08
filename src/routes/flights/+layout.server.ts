import { db } from "$lib/db";
import { airports } from "$lib/db/schema";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    return {
        airports: db.select().from(airports),
    }
}