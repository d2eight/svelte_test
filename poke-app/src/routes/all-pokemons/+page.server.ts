import type { Actions } from '@sveltejs/kit';
import { z, ZodDefault } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
import { superValidate } from 'sveltekit-superforms';

import type { PokemonIconDataObjType } from '$lib/types/types';

type searchParams = {
	types: string[];
	sex: string;
};

type pokemonTypeFormFields = Record<string, ZodDefault<z.ZodBoolean>>;

function createSchema(typeData: PokemonIconDataObjType, searchParams: searchParams) {
	const typeFields: pokemonTypeFormFields = {};

	for (const type in typeData) {
		typeFields[type] = z.boolean().default(searchParams.types.includes(type));
	}

	return z.object({
		typeFields: z.object(typeFields),
		sex: z.string().default(searchParams.sex ? searchParams.sex : '')
	});
}

const schema = (searchParams: searchParams) => createSchema(pokemonTypesIcons, searchParams);

export const load = async ({ url }) => {
	const searchParams: searchParams = {
		types: url.searchParams.get('types')?.split(',') || [],
		sex: url.searchParams.get('sex') || ''
	};

	const formSchema = schema(searchParams);

	const form = await superValidate(zod(formSchema));

	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const searchParams: searchParams = {
			types: event.url.searchParams.get('types')?.split(',') || [],
			sex: event.url.searchParams.get('sex') || ''
		};

		const formSchema = schema(searchParams);

		const form = await superValidate(event, zod(formSchema));

		return { form };
	}
} satisfies Actions;
