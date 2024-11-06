import { cassClient } from "$lib/Clients.server";
import { json } from "@sveltejs/kit";

export async function DELETE({params}) {
    const shoeName = params.shoename;
    const query = "DELETE FROM shoe_keyspace.shoes WHERE name = ?";

    await cassClient.execute(query, [shoeName], { prepare: true });

    return json({});
}