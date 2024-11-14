<script lang="ts">

		import type { PokemonTypeIconType } from '../types/types';

		import { Tooltip } from '@skeletonlabs/skeleton-svelte';

		const { name, icon, color } = $props();

		let hoverStatus = $state(false);

</script>

<div>
		<Tooltip
				bind:open={hoverStatus}
				positioning={{ placement: 'top' }}
				triggerBase="underline"
				contentBase="card"
				openDelay={100}>
				{#snippet trigger()}
						{#snippet render_icon(icon, color)}
								{@const Icon = icon}
								<Icon color={color}/>
						{/snippet}
						{@render render_icon(icon, color)}
				{/snippet}
				{#snippet content()}
						<span style={`padding: 10px; border-radius: 4px; background: ${color};`}>
								<span style={`font-weight:600; filter: invert(1); color: ${color}; letter-spacing: 3px;`}>{name}</span>
						</span>
				{/snippet}
		</Tooltip>
</div>