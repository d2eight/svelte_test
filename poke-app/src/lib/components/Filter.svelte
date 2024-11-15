<script>
	import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
	import { superForm } from 'sveltekit-superforms';

	import PokemonTypeIcon from './PokemonTypeIcon.svelte';

	const { formData } = $props();

	const { form } = superForm(formData.form);

</script>

<div class="card border-[2px] border-[#d2691e] bg-[#faebd7] p-[20px] mb-[100px]">
	<form method="POST">
		<div class="mb-[20px]">
			<div class="flex flex-col gap-[20px] max-w-[300px] text-center">
				<p class="text-xl font-bold">Types</p>
				<div class="flex flex-wrap justify-center gap-[30px]">
					{#each Object.entries($form) as [type, value]}
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" name={type} bind:checked={$form[type]}/>
							<PokemonTypeIcon name={type} icon={pokemonTypesIcons[type].icon} color={pokemonTypesIcons[type].color} />
						</label>
					{/each}
				</div>
			</div>
		</div>
		<button class="w-full btn preset-filled-warning-500">Search</button>
	</form>
</div>

