import type {Pokemon} from "../../types/types";

export async function load() {
    let response: Pokemon[] = [];

    const allPokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
    if (!allPokemons.ok) {
        throw new Error("Failed to load pokemons");
    }
    const allPokemonsData = await allPokemons.json();

    for (const pokemon of allPokemonsData.results) {
        const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const pokemonInfoData = await pokemonInfo.json();
        response.push(
            {
                name: pokemon.name,
                image: pokemonInfoData.sprites.front_default
            }
        )
    }

    return { response };
}
