import { cassClient } from "$lib/Clients.server";
import type { Shoe } from "$lib/Types";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
    const searchText = await url.searchParams.get('search');
    const mode = await url.searchParams.get('searchMode');

    let shoes: Shoe[] = [];
    if (searchText == null || searchText == "") {
        shoes = await loadShoes([], "SELECT * FROM shoe_keyspace.shoes");
    } else if (mode) { // The mode is only passed from the form in the first place if it's true
        shoes = await loadShoes([searchText], "SELECT * FROM shoe_keyspace.shoes WHERE colorways CONTAINS ?");
    } else {
        shoes = await loadShoes([searchText], "SELECT * FROM shoe_keyspace.shoes WHERE name = ?");
    }

    return { shoes };
}) satisfies PageServerLoad;

const loadShoes = async (args: string[], query: string) => {
    const result = await cassClient.execute(query, args, { prepare: true });
    const shoes: Shoe[] = result.rows.map((row) => { 
        const shoe: Shoe = {
            name: row['name'],
            brand_name: row['brand_name'],
            year_released: row['year_released'],
            description: row['description'],
            colorways: row['colorways']
        };
        return shoe;
    });
    return shoes;
}
