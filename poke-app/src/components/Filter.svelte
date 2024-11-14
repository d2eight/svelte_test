<script>
	import { pokemonTypesIcons } from '$lib/pokemonTypesIcons';

	import PokemonTypeIcon from './PokemonTypeIcon.svelte';

</script>

<div>
	<form>
		{#each Object.entries(pokemonTypesIcons) as [title, icon]}
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" />
				<PokemonTypeIcon name={title} icon={icon.icon} color={icon.color} />
			</label>
		{/each}
	</form>
</div>