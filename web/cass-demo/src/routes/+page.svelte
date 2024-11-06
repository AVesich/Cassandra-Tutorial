<script lang="ts">
    import { goto } from "$app/navigation";
import type { PageData } from "./$types";

    export let data: PageData;
    $: shoes = data.shoes;

    const deleteShoe = (i:number, shoeName: string) => {
        data.shoes.splice(i, 1);
        data.shoes = data.shoes;
        console.log(shoes);
        fetch(`/api/shoes/${shoeName}`, {
            method: 'DELETE'
        });
    };
</script>

<form>
    <fieldset role="search">
        <input
            name="search" 
            type="search"
            placeholder="Search for a shoe type or colorway..."
            aria-label="Search" />
        <input
            type="submit"
            value="Search"
        />
    </fieldset>
    <label>
        Search by name
        <input name="searchMode" type="checkbox" role="switch"/>
        Search by colorway
    </label>
</form>

{#each shoes as shoe, i}
    <article>
        <div role="group">
            <hgroup style="display: inline;">
                <h3>{shoe.name}</h3>
                <i>{shoe.brand_name} • {shoe.year_released}</i>
            </hgroup>
            <button class="outline" style="flex-grow: 0; border-color: red; color:red;" on:click={() => {
                deleteShoe(i, shoe.name);
            }}>Delete</button>
            <button class="outline contrast" style="flex-grow: 0;" on:click={() => {
                goto(`/${shoe.name}`);
            }}>edit</button>
        </div>
        <p>{shoe.description}</p>

        <nav>
            <ul>
                <li>Colorways:</li>
                {#each shoe.colorways as colorway}
                    <li><i>{colorway}</i></li>
                {/each}
            </ul>
        </nav>
    </article>
{/each}




