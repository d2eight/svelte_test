<script lang="ts">
    import PokemonCard from "$lib/components/PokemonCard.svelte";
    import Pagination from "$lib/components/Pagination.svelte";
    import Filter from "$lib/components/Filter.svelte";

    import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

    const { data } = $props();

    import { QueryCache } from '@tanstack/svelte-query';

    const queryCache = new QueryCache({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onSettled: (data, error) => {
            console.log(data, error)
        },
    })

    console.log(queryCache.findAll());

</script>
<div class="h-[100vh] relative max-w-[1200px] p-[50px] m-auto">
    <Filter formData={data.form} />
    {#await data.pokemonsData}
        <div class="absolute top-[50%] right-[50%] translate-x-[50%]">
            <ProgressRing value={null} size="size-14" meterStroke="stroke-warning-600"/>
        </div>
    {:then pokemonsData}
        <div>
            <Pagination pokemonsCount={pokemonsData.count} />
        </div>
        <ul class="flex flex-wrap justify-center gap-[50px]">
            {#each pokemonsData.pokemons as pokemon}
                <li>
                    <a class="" href={`/all-pokemons/${pokemon.name}`} data-sveltekit-preload-data="tap">
                        <PokemonCard name={pokemon.name} image={pokemon.image} pokemonTypes={pokemon.pokemonTypes} />
                    </a>
                </li>
            {/each}
        </ul>
    {:catch error}
        <p>Failed</p>
    {/await}
</div>

