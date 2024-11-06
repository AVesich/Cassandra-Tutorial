<script lang="ts">
    import { enhance } from "$app/forms";

    // Colorways
    let colorways = 0;
</script>

<form use:enhance method="POST">
    <input
        type="text"
        name="shoeType"
        placeholder="Shoe Type"
        aria-label="Shoe Type"
    >
    <input
        type="text"
        name="shoeBrand"
        placeholder="Shoe Brand"
        aria-label="Shoe Brand"
    >
    <input
        type="number"
        name="year"
        aria-label="Shoe Release Year"
        min="1950"
        max="2024"
        step="1"
        placeholder="Release Year"
    >
    <textarea
        name="description"
        placeholder="A short shoe description..."
        aria-label="Short shoe description"
        maxlength="255"
    ></textarea>
    {#each {length: colorways} as _}
        <fieldset role="group">
            <input
                type="text"
                name="colorway"
                placeholder="Colorway name"
                aria-label="Colorway name"
            >
            <button on:click={() => {colorways--;}} type="button" class="pico-background-red-500">
                -
            </button>
        </fieldset>
    {/each}
    <button type="button" on:click={() => {colorways++;}}>
        Add Colorway
    </button>
    <hr/>
    <button type="submit">
        Add Shoe
    </button>
</form>