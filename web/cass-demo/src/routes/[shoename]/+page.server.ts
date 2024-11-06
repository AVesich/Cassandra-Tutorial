import { cassClient } from "$lib/Clients.server";
import type { Shoe } from "$lib/Types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load = (async ({ params }) => {
    const shoeName = params.shoename;

    const query = "SELECT * FROM shoe_keyspace.shoes WHERE name = ?";
    const result = await cassClient.execute(query, [shoeName], { prepare: true });
    const shoe: Shoe = {
        name: result.first()['name'],
        brand_name: result.first()['brand_name'],
        year_released: result.first()['year_released'],
        description: result.first()['description'],
        colorways: result.first()['colorways'] ?? []
    };

    return { shoe };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const shoeType = params.shoename;
        const shoeBrand = data.get('shoeBrand');
        const year = data.get('year');
        const description = data.get('description');
        const colorways = data.getAll('colorway');

        const query = "UPDATE shoe_keyspace.shoes SET brand_name=?, year_released=?, description=?, colorways=? WHERE name=?";
        await cassClient.execute(query, [shoeBrand, year, description, colorways, shoeType], { prepare: true });

        throw redirect(307, '/');
    }
};
