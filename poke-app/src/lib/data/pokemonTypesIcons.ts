import {
	Smile,
	Flame,
	Bird,
	Droplets,
	Wand,
	LeafyGreen,
	Swords,
	TestTubeDiagonal,
	Earth,
	Mountain,
	Bug,
	Ghost,
	Anvil,
	Zap,
	Brain,
	Snowflake,
	Moon,
	Origami
} from 'lucide-svelte';

import type { PokemonIconDataObjType } from '$lib/types/types';

export const pokemonTypesIcons: PokemonIconDataObjType = {
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
		color: '#91a3b0'
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
	dragon: {
		icon: Origami,
		color: '#6b0606'
	},
	dark: {
		icon: Moon,
		color: '#3c477c'
	},
	fairy: {
		icon: Wand,
		color: '#f259ff'
	}
};
