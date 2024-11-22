import type { Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
import { superValidate } from 'sveltekit-superforms';

function createSchema (typeData, searchParams) {
	const typeFields = {};

	const defaultValue = (type) => {
		return searchParams.types.split(',').includes(type);
	}

	for (const type in typeData) {
		typeFields[type] = z.boolean().default(searchParams.types ? defaultValue(type) : false);
	}

	return z.object({
		typeFields: z.object(typeFields),
		sex: z.string('').default('')
	});

}

const schema = (searchParams) => createSchema(pokemonTypesIcons, searchParams);


export const load = async ({url}) => {
	const searchParams = {
		types: url.searchParams.get('types'),
		sex: url.searchParams.get('sex')
	};

	const formSchema = schema(searchParams);

	const form = await superValidate(zod(formSchema));

	return {
		form
	}
}

export const actions = {
	default: async (event) => {

		const searchParams = {
			types: event.url.searchParams.get('types'),
			sex: event.url.searchParams.get('sex')
		};

		const formSchema = schema(searchParams);

		const form = await superValidate(event, zod(formSchema));

		return { form };
	}
} satisfies Actions;