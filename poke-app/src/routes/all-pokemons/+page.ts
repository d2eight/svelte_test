export async function load({url, fetch, data}) {

    const currentPage = Number(url.searchParams.get('page'));

    const offset: number = ((currentPage) - 1) * 9 || 0;

    async function getPokemons(offset: number) {
        const allPokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`);
        if (!allPokemons.ok) {
            throw new Error("Failed to load pokemons");
        }
        const allPokemonsData = await allPokemons.json();

        const pokemonDetails = await Promise.all(
            allPokemonsData.results.map(async (pokemon: { name: string }) => {
                const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                const pokemonInfoData = await pokemonInfo.json();

                const types: any = [];

                pokemonInfoData.types.forEach((type) => {
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
            count: allPokemonsData.count,
            pokemons: pokemonDetails,
        }
    }

    return {
        pokemonsData: getPokemons(offset),
        form: data
    };
}

