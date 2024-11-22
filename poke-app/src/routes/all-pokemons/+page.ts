export async function load({url, fetch, data}) {

    type PokemonTypeField = {
        slot: number,
        type: {
            name: string,
            url: string
        }
    }

    const currentPage = Number(url.searchParams.get('page'));

    const currentPokemonTypes = url.searchParams.get('types') ? url.searchParams.get('types')?.split(',') : [];
    const currentPokemonSex = url.searchParams.get('sex') ? url.searchParams.get('sex')?.split(',') : [];

    const offset: number = ((currentPage) - 1) * 9 || 0;

    async function getPokemons(offset: number) {

        const allPokemonsData = async () => {
            if (currentPokemonTypes.length) {
                const allPokemonsByType = await Promise.all(
                    currentPokemonTypes.map(async (pokemonType) => {
                        const allPokemonsByTypeInfo = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
                        const allPokemonsByTypeInfoJson = await allPokemonsByTypeInfo.json();
                        return allPokemonsByTypeInfoJson.pokemon.map((pokemon) => {
                            return pokemon.pokemon
                        });
                    })
                );

                const allPokemonsByTypeFiltered = allPokemonsByType.flat().reduce((acc, pokemon) => {
                    const duplicateIndex = acc.findIndex(existingPokemon => JSON.stringify(existingPokemon) === JSON.stringify(pokemon));

                    if (duplicateIndex !== -1) {
                        const duplicatedPokemon = acc.splice(duplicateIndex, 1)[0];
                        acc.unshift(duplicatedPokemon)
                    } else {
                        acc.push(pokemon);
                    }
                    return acc;
                }, [])

                return {
                    pokemons: allPokemonsByTypeFiltered.slice(offset, offset + 9),
                    count: allPokemonsByTypeFiltered.length,
                };
            } else {
                const allPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`)
                const allPokemonsJson = await allPokemons.json();
                return {
                    pokemons: allPokemonsJson.results,
                    count: allPokemonsJson.count
                }
            }
        }

        const allPokemonsDataResponse = await allPokemonsData();

        const pokemonDetails = await Promise.all(
            allPokemonsDataResponse.pokemons.map(async (pokemon) => {

                const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const pokemonInfoData = await pokemonInfo.json();

                const types: string[] = [];

                pokemonInfoData.types.forEach((type: PokemonTypeField) => {
                    types.push(type.type.name);
                })

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
        }
    }

    return {
        pokemonsData: getPokemons(offset),
        form: data,
    };
}

