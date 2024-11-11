export async function load({params}) {
    const pokemonInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`);
    const pokemonInfoData = await pokemonInfo.json();
    return {
        stats: pokemonInfoData.stats,
        gif: pokemonInfoData.sprites.other.showdown.front_default
    };
}
