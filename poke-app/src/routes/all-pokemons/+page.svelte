<script lang="ts">
    import PokemonCard from "../../components/PokemonCard.svelte";

    const { data } = $props();

</script>

<div class="pokemon_cards">
    {#if data}
        <ul class="pokemon_cards_list">
            {#each data.response as pokemon}
                <li>
                    <a href={`/all-pokemons/${pokemon.name}`}>
                        <PokemonCard name={pokemon.name} image={pokemon.image}/>
                    </a>
                </li>
            {/each}
        </ul>
    {:else}
    <p>Loading...</p>
    {/if}
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