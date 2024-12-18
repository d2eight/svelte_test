import type { PokemonInfo, PokemonCard } from '$lib/types/types';

type PokemonTypeField = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

type PokemonSexCallType = {
	pokemon_species: PokemonInfo;
	rate: number;
};

type PokemonTypeCallType = {
	pokemon: PokemonInfo;
	slot: number;
};

export async function load({ url, fetch, data }) {
	const currentPage = Number(url.searchParams.get('page'));

	const currentPokemonTypes = url.searchParams.get('types')
		? url.searchParams.get('types')?.split(',')
		: [];
	const currentPokemonSex = url.searchParams.get('sex')
		? url.searchParams.get('sex')?.split(',')
		: [];

	const offset: number = (currentPage - 1) * 9 || 0;

	async function getPokemons(offset: number) {
		const allPokemonsData = async () => {
			const allPokemonsBySex = async (pokemonsArray?: PokemonInfo[]) => {
				if (currentPokemonSex?.length) {
					const allPokemonsBySexInfo = await fetch(
						`https://pokeapi.co/api/v2/gender/${currentPokemonSex}`
					);
					const allPokemonsBySexInfoJson = await allPokemonsBySexInfo.json();
					return allPokemonsBySexInfoJson.pokemon_species_details.reduce(
						(acc: PokemonInfo[], curr: PokemonSexCallType) => {
							if (pokemonsArray) {
								if (pokemonsArray.some((pokemon) => pokemon.name === curr.pokemon_species.name)) {
									acc.push(curr.pokemon_species);
								}
							} else {
								acc.push(curr.pokemon_species);
							}
							return acc;
						},
						[]
					);
				} else {
					return [];
				}
			};

			if (currentPokemonTypes?.length) {
				const allPokemonsByType = await Promise.all(
					currentPokemonTypes.map(async (pokemonType) => {
						const allPokemonsByTypeInfo = await fetch(
							`https://pokeapi.co/api/v2/type/${pokemonType}`
						);
						const allPokemonsByTypeInfoJson = await allPokemonsByTypeInfo.json();
						return allPokemonsByTypeInfoJson.pokemon.map((pokemon: PokemonTypeCallType) => {
							return pokemon.pokemon;
						});
					})
				);

				const allPokemonsByTypeFiltered: PokemonInfo[] = allPokemonsByType
					.flat()
					.reduce((acc: PokemonInfo[], pokemon: PokemonInfo) => {
						const duplicateIndex = acc.findIndex(
							(existingPokemon) => JSON.stringify(existingPokemon) === JSON.stringify(pokemon)
						);

						if (duplicateIndex !== -1) {
							const duplicatedPokemon = acc.splice(duplicateIndex, 1)[0];
							acc.unshift(duplicatedPokemon);
						} else {
							acc.push(pokemon);
						}
						return acc;
					}, []);

				const allPokemonsResponse = currentPokemonSex?.length
					? await allPokemonsBySex(allPokemonsByTypeFiltered)
					: allPokemonsByTypeFiltered;

				return {
					pokemons: allPokemonsResponse.slice(offset, offset + 9),
					count: allPokemonsResponse.length
				};
			} else {
				const fetchAllPokemons = async () => {
					const allPokemons = await fetch(
						`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`
					);
					const allPokemonsJson = await allPokemons.json();
					return {
						pokemons: allPokemonsJson.results,
						count: allPokemonsJson.count
					};
				};

				const allPokemonsBySexInfo = await allPokemonsBySex();
				const allPokemonsResponse = allPokemonsBySexInfo.length
					? {
							pokemons: allPokemonsBySexInfo.slice(offset, offset + 9),
							count: allPokemonsBySexInfo.length
						}
					: await fetchAllPokemons();
				return allPokemonsResponse;
			}
		};

		const allPokemonsDataResponse = await allPokemonsData();

		const pokemonDetails: PokemonCard[] = await Promise.all(
			allPokemonsDataResponse.pokemons.map(async (pokemon: PokemonInfo) => {
				const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
				const pokemonInfoData = await pokemonInfo.json();

				const types: string[] = [];

				pokemonInfoData.types.forEach((type: PokemonTypeField) => {
					types.push(type.type.name);
				});

				return {
					name: pokemon.name,
					image: pokemonInfoData.sprites.front_default,
					types: types
				};
			})
		);

		return {
			pokemons: pokemonDetails,
			count: allPokemonsDataResponse.count
		};
	}

	return {
		pokemonsData: getPokemons(offset),
		form: data
	};
}
