<script lang="ts">
    import PokemonCard from "$lib/components/PokemonCard.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import Filter from "$lib/components/Filter.svelte";

    import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

    const { data } = $props();

</script>
<div class="h-[100vh] relative max-w-[1200px] p-[50px] m-auto">
    <Filter formData={data.form} />
    {#await data.pokemonsData}
        <div class="absolute top-[50%] right-[50%] translate-x-[50%]">
            <ProgressRing value={null} size="size-14" meterStroke="stroke-warning-600"/>
        </div>
    {:then pokemonsData}
        <ul class="flex flex-wrap justify-center gap-[50px]">
            {#each pokemonsData.pokemons as pokemon}
                <li>
                    <a class="" href={`/all-pokemons/${pokemon.name}`} data-sveltekit-preload-data="tap">
                        <PokemonCard name={pokemon.name} image={pokemon.image} pokemonTypes={pokemon.types} />
                    </a>
                </li>
            {/each}
        </ul>
    {:catch error}
        <p>Failed</p>
    {/await}
    <div class="">
        <Pagination />
    </div>
</div>

