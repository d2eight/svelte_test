<script lang="ts">
    import type { PokemonCard } from "$lib/types/types";
    import PokemonTypeIcon from './PokemonTypeIcon.svelte';

    import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';

    const { name, image, pokemonTypes }:PokemonCard = $props();

</script>

<div
  class="relative flex flex-col justify-between items-center card card-hover border-[2px] border-[#d2691e] bg-[#faebd7] w-[300px] h-[200px]">
    <img class="h-[100%]" src={image} alt={name}/>
    <span class="text-center w-full border-t-[2px] border-[#d2691e] tracking-[5px]">{name.toUpperCase()}</span>
    <div class="absolute right-[5px] top-[5px]">
        <ul class="flex gap-[5px]">
            {#each pokemonTypes as poketype}
                {#if pokemonTypesIcons[poketype]}
                    <li>
                        <PokemonTypeIcon name={poketype} icon={pokemonTypesIcons[poketype].icon} color={pokemonTypesIcons[poketype].color} />
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>
