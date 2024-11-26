import type { Icon } from 'lucide-svelte';

export type PokemonCard = {
	name: string;
	image: string;
	pokemonTypes: [];
};

export type PokemonInfo = {
	name: string;
	url: string;
};

export type PokemonIconData = {
	name: string;
	icon: typeof Icon;
	color: string;
};

export type PokemonIconDataObjType = Record<string, { icon: typeof Icon; color: string }>;
