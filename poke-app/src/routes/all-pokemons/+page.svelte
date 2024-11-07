<script lang="ts">
    import "../../app.css"
    import type {Pokemon} from "../../types/types";
    import { onMount } from "svelte";

    import PokemonCard from "../../components/PokemonCard.svelte";

    let pokemonsRequest: Promise<Pokemon[]> = $state(Promise.resolve([]));

    async function fetchAllPokemons(): Promise<Pokemon[]> {
        try {
            let pokemonData: Pokemon[] = [];

            const pokemonApi = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
            const pokemonApiResponse = await pokemonApi.json();

            for (const pokemon of pokemonApiResponse.results) {
                const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const pokemonInfoResponse = await pokemonInfo.json();
                pokemonData.push(
                    {
                        name: pokemon.name,
                        image: pokemonInfoResponse.sprites.front_default
                    }
                );
            }
            return pokemonData;

        } catch (error) {
            return [];
        }
    }

    onMount(() => {
        pokemonsRequest = fetchAllPokemons();
    })

</script>

<div class="pokemon_cards">
    {#await pokemonsRequest}
        <p>...fetching</p>
    {:then pokemonData}
        <ul class="pokemon_cards_list">
            {#each pokemonData as pokemon}
                <li>
                    <a href={`/all-pokemons/${pokemon.name}`}>
                        <PokemonCard name={pokemon.name} image={pokemon.image} />
                    </a>
                </li>
            {/each}
        </ul>
    {:catch error}
        <p>{error}</p>
    {/await}
</div>

<style>
    .pokemon_cards {
        padding: 20px 0;
        max-width: 1200px;
        margin: 0 auto;
    }

    .pokemon_cards_list {
        display: flex;
        justify-content: space-around;
        gap: 20px;
        flex-wrap: wrap;
    }
</style>