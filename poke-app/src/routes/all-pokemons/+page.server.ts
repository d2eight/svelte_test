import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
import { superValidate } from 'sveltekit-superforms';

function createSchema (typeData, searchParams) {
	const typeFields = {};

	const defaultValue = (type) => {
		return searchParams.split(',').includes(type);
	}

	for (const type in typeData) {
		typeFields[type] = z.boolean().default(searchParams ? defaultValue(type) : false);
	}

	return z.object(typeFields);

}

const schema = (searchParams) => createSchema(pokemonTypesIcons, searchParams);


export const load = async ({url}) => {
	const searchParams = url.searchParams.get('types');

	const formSchema = schema(searchParams);

	const form = await superValidate(zod(formSchema));

	return {
		form
	}
}

export const actions = {
	default: async (event) => {
		const searchParams = event.url.searchParams.get('types');

		const formSchema = schema(searchParams);

		const form = await superValidate(event, zod(formSchema));

		return { form };
	}
} satisfies Actions;