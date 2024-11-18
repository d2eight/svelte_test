import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
import { superValidate } from 'sveltekit-superforms';

function createSchema (typeData) {
	const typeFields = {};

	for (const type in typeData) {
		typeFields[type] = z.boolean().default(false);
	}

	return z.object(typeFields);

}

const schema = createSchema(pokemonTypesIcons);

export const load = async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	}
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(schema));
		return { form };
	}
} satisfies Actions;