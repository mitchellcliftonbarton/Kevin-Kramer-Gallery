<script>
	import { PortableText } from '@portabletext/svelte';
	import PressItem from '$lib/components/PressItem.svelte';

	let { data } = $props();

	const { press, exhibition_text } = data?.exhibition;
</script>

<div class="exhibition-content px-lg pb-lg pt-xxl">
	<div class="max-w-def-max container mx-auto">
		{#if exhibition_text}
			<section class="exhibition-text">
				<div class="rich-text">
					<PortableText value={exhibition_text} />
				</div>
			</section>
		{/if}

		{#if press}
			<section class="press-section">
				<h2 class="text-center">Press</h2>

				<div class="press-items mt-line-break">
					{#each press as pressItem}
						<PressItem press={pressItem} />
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.exhibition-content {
		min-height: 100svh;
	}

	.container {
		& > * + * {
			margin-top: var(--spacing-xl);
		}
	}

	.press-items {
		:global(& > * + *) {
			margin-top: var(--spacing-line-break);
		}
	}
</style>
