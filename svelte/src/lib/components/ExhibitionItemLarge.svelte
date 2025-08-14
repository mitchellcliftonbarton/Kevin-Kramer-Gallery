<script>
	import Portable from './Portable.svelte';
	import { formatExhibitionTitle } from '$lib/utils';

	// define props
	let { exhibition, typeTitle = 'Exhibition' } = $props();

	// destructure exhibition
	const { featured_image, title } = exhibition;

	const formattedExhibitionTitle = formatExhibitionTitle(exhibition);
</script>

<a href={`/exhibitions/${exhibition.slug.current}`} class="exhibition-item-large block">
	<div class="titles px-sm-mid lg:px-base gap-base-mid lg:gap-base grid grid-cols-12">
		<div class="col-span-12 lg:col-span-6">
			{#if typeTitle}
				<p>{typeTitle}</p>
			{/if}

			{#if formattedExhibitionTitle}
				<div>{@html formattedExhibitionTitle}</div>
			{/if}
		</div>
	</div>

	{#if featured_image?.asset?.url}
		<figure class="bg-grey-1 aspect-[4/3] overflow-hidden">
			<img
				data-src={featured_image.asset.url}
				alt={title}
				class="lazyload h-full w-full object-cover object-center"
			/>
		</figure>
	{/if}
</a>

<style>
	.exhibition-item-large {
		& > * + * {
			margin-top: calc(var(--spacing-sm-mid) - 1px);

			@media (min-width: 1024px) {
				margin-top: calc(var(--spacing-base) - 6px);
			}
		}

		&:hover {
			color: var(--color-blue);

			@media (min-width: 1024px) {
				color: inherit;
			}
		}
	}
</style>
