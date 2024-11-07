<script lang="ts">
    import "../../../app.css"
    import {page} from "$app/stores";
    import {onMount} from "svelte";
    import PokemonCard from "../../../components/PokemonCard.svelte";
    import type {Pokemon} from "../../../types/types";

    const name: string = $state($page.params.pokemonId);

    let pokemonRequest: any = $state();

    async function fetchPokemon(): Promise<void> {
        try {
            const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return await pokemonInfo.json();
        } catch (error) {

        }
    }

    onMount (() => {
        pokemonRequest = fetchPokemon();
        async function getPokemonData (): Promise<any> {
            console.log(await pokemonRequest);
        }
        getPokemonData();
    })


</script>

<div class="pokemon_container">
    <div class="pokemon_content">
        {#await pokemonRequest}
            <p>...fetching</p>
        {:then pokemonData}
            <img class="pokemon_content_img" src={pokemonData.sprites.other.showdown.front_default} alt={pokemonData.name}>
            <div class="pokemon_content_stats">
                <h2 class="pokemon_title">{pokemonData.name}</h2>
            </div>
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>

<style>
    .pokemon_container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px 0;
    }

    .pokemon_content {
        display: flex;
        gap: 80px;
        background: antiquewhite;
        border: 4px solid chocolate;
        border-radius: 20px;
        padding: 30px;
    }

    .pokemon_content .pokemon_content_img {
        width: 250px;
        height: auto;
    }
</style>