<script lang="ts">
    import type { Pokemon } from "../types/types";

    let { name, image }:Pokemon = $props();
</script>

<div class="pokemon_card">
    <img class="pokemon_image" src={image} alt={name}/>
    <span>{name.toUpperCase()}</span>
</div>

<style>
    .pokemon_card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: antiquewhite;
        border: 2px solid chocolate;
        border-radius: 10px;
        gap: 20px;
        width: 300px;
        height: auto;
        padding: 20px;
        transition: ease-in-out 0.1s;
    }

    .pokemon_card:hover {
        background: coral;
    }
</style>