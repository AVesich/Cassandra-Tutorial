<script lang="ts">
    import { enhance } from "$app/forms";

    export let data: PageData;
    $: shoe = data.shoe;
</script>

<form use:enhance method="POST">
    <h1>{shoe.name}</h1>
    <input
        type="text"
        name="shoeBrand"
        placeholder="Shoe Brand"
        aria-label="Shoe Brand"
        value={shoe.brand_name}
    >
    <input
        type="number"
        name="year"
        aria-label="Shoe Release Year"
        min="1950"
        max="2024"
        step="1"
        placeholder="Release Year"
        value={shoe.year_released}
    >
    <textarea
        name="description"
        placeholder="A short shoe description..."
        aria-label="Short shoe description"
        maxlength="255"
    >{shoe.description}</textarea>
    {#each shoe.colorways as colorway, i}
        <fieldset role="group">
            <input
                type="text"
                name="colorway"
                placeholder="Colorway name"
                aria-label="Colorway name"
                value={colorway}
            >
            <button on:click={() => {
                shoe.colorways.splice(i, 1);
                shoe = shoe;
            }} type="button" class="pico-background-red-500">
                -
            </button>
        </fieldset>
    {/each}
    <button type="button" on:click={() => {
        shoe.colorways.push("");
        shoe = shoe;
    }}>
        Add Colorway
    </button>
    <hr/>
    <button type="submit">
        Update Shoe
    </button>
</form>