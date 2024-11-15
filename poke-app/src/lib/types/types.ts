import type { Icon as LucideIcon } from 'lucide-svelte';

export type PokemonCard = {
    name: string,
    image: string,
    pokemonTypes: []
}

export type PokemonIconData = {
    name: string;
    icon: typeof LucideIcon;
    color: string;
}