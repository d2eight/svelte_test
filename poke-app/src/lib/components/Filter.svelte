<script>
	import { pokemonTypesIcons } from '$lib/data/pokemonTypesIcons';
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/stores';

	import PokemonTypeIcon from './PokemonTypeIcon.svelte';
	import { goto } from '$app/navigation';

	const { formData } = $props();

	const { form, enhance, isTainted } = superForm(formData.form, {
		invalidateAll: false,
		resetForm: false,
		onSubmit({cancel}) {
			if(!isTainted()) {
				cancel();
			}
		},
		onResult({result}) {
			if(result.type === "success") {
				const currentFormData = result.data.form.data;

				const url = new URL($page.url);

				const requestedPokemonsTypes = [];

				for (let key in currentFormData) {
					if ((currentFormData[key])) {
						requestedPokemonsTypes.push(key);
					}
				}

				requestedPokemonsTypes.length
					? url.searchParams.set('types', `${requestedPokemonsTypes.join(',')}`)
					: url.searchParams.delete('types');

				url.searchParams.set('page', '1');

				return goto(url.toString());

			}
		}
	});

</script>

<div class="card border-[2px] border-[#d2691e] bg-[#faebd7] p-[20px] mb-[50px]">
	<form method="POST" use:enhance>
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

