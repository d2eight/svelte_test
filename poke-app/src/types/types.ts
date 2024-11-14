import type { Icon as LucideIcon } from 'lucide-svelte';

export type Pokemon = {
    name: string,
    image: string,
    pokemonTypes: []
}

export type PokemonTypeIconType = {
    icon: typeof LucideIcon;
    color: string;
}