import type { Icon as LucideIcon } from 'lucide-svelte';

export type PokemonCard = {
    name: string,
    image: string,
    pokemonTypes: []
}

export type PokemonInfo = {
    name: string,
    url: string
}

export type PokemonIconData = {
    name: string;
    icon: typeof LucideIcon;
    color: string;
}