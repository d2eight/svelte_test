<script lang="ts">
    import type { Pokemon } from "../types/types";

    import { Smile, Flame, Bird, Droplets, Wand, LeafyGreen, Swords, TestTubeDiagonal, Earth,  Mountain, Bug, Ghost, Anvil, Zap, Brain, Snowflake, Moon, Sparkles } from 'lucide-svelte';

    const pokemonTypesIcons = {
        normal: {
            icon: Smile,
            color: '#000000'
        },
        fighting: {
            icon: Swords,
            color: '#999b9d'
        },
        flying: {
            icon: Bird,
            color: '#8b575b'
        },
        poison: {
            icon: TestTubeDiagonal,
            color: '#93e51e'
        },
        ground: {
            icon: Earth,
            color: '#87421c'
        },
        rock: {
            icon: Mountain,
            color: '#3c477c'
        },
        bug: {
            icon: Bug,
            color: '#ff3333'
        },
        ghost: {
            icon: Ghost,
            color: '#54d8a7'
        },
        steel: {
            icon: Anvil,
            color: '#99a3a3'
        },
        fire: {
            icon: Flame,
            color: '#ff5a00'
        },
        water: {
            icon: Droplets,
            color: '#2389da'
        },
        grass: {
            icon: LeafyGreen,
            color: '#117c13'
        },
        electric: {
            icon: Zap,
            color: '#ffff33'
        },
        psychic: {
            icon: Brain,
            color: '#f3b5b8'
        },
        ice: {
            icon: Snowflake,
            color: '#20c3d0'
        },
        dark: {
            icon: Sparkles,
            color: '#91a3b0'
        },
        fairy: {
            icon: Wand,
            color: '#f259ff'
        },
        stellar: {
            icon: Sparkles,
            color: '#ffd250'
        }
    }

    const { name, image, pokemonTypes }:Pokemon = $props();

</script>

<div class="relative flex flex-col justify-between items-center card card-hover border-[2px] border-[#d2691e] bg-[#faebd7] w-[300px] h-[200px]">
    <img class="h-[100%]" src={image} alt={name}/>
    <span class="text-center w-full border-t-[2px] border-[#d2691e]">{name.toUpperCase()}</span>
    <div class="absolute right-[5px] top-[5px]">
        <ul class="flex gap-[5px]">
            {#each pokemonTypes as poketype}
                {#if pokemonTypesIcons[poketype]}
                    <li>
                        <svelte:component this={pokemonTypesIcons[poketype].icon} color={pokemonTypesIcons[poketype].color} />
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>
