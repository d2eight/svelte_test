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
		dataType: "json",
		onSubmit({cancel}) {
			// if(!isTainted()) {
			// 	cancel();
			// }
		},
		onResult({result}) {
			if(result.type === "success") {
				const currentFormData = result.data.form.data;

				const url = new URL($page.url);

				const requestedPokemonsTypes = [];

				for (let key in currentFormData.typeFields) {
					if ((currentFormData.typeFields[key])) {
						requestedPokemonsTypes.push(key);
					}
				}

				requestedPokemonsTypes.length
					? url.searchParams.set('types', `${requestedPokemonsTypes.join(',')}`)
					: url.searchParams.delete('types');

				currentFormData.sex !== ''
					? url.searchParams.set('sex', currentFormData.sex)
					: url.searchParams.delete('sex')

				url.searchParams.set('page', '1');

				return goto(url.toString());

			}
		}
	});

	const sex = ['', 'male', 'female'];

</script>

<div class="card border-[2px] border-[#d2691e] bg-[#faebd7] p-[20px] mb-[50px]">
	<form method="POST" use:enhance>
		<div class="mb-[20px]">
			<div class="flex gap-[20px] text-center">
				<div class="flex flex-col gap-[20px]">
					<p class="text-xl font-bold">Types</p>
					<div class="flex flex-wrap justify-center gap-[30px]">
						{#each Object.entries($form.typeFields) as [type, value]}
							<label class="flex items-center space-x-2">
								<input class="checkbox" type="checkbox" name={type} bind:checked={$form.typeFields[type]}/>
								<PokemonTypeIcon name={type} icon={pokemonTypesIcons[type].icon} color={pokemonTypesIcons[type].color} />
							</label>
						{/each}
					</div>
				</div>
				<div class="flex flex-col gap-[20px] w-full">
					<p class="text-xl font-bold">Sex</p>
					<select id="sex" name="sex" class="select" bind:value={$form.sex}>
						{#each sex as sexOption}
							<option value={sexOption}>{sexOption}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<button class="w-full btn preset-filled-warning-500">Search</button>
	</form>
</div>