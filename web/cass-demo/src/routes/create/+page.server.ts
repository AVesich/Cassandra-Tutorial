import { cassClient } from "$lib/Clients.server";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const shoeType = data.get('shoeType');
        const shoeBrand = data.get('shoeBrand');
        const year = data.get('year');
        const description = data.get('description');
        const colorways = data.getAll('colorway');

        const query = "INSERT INTO shoe_keyspace.shoes (name, brand_name, year_released, description, colorways) VALUES (?, ?, ?, ?, ?)";
        await cassClient.execute(query, [shoeType, shoeBrand, year, description, colorways], { prepare: true });

        throw redirect(307, '/');
    }
};
