<script>
	import Portable from './Portable.svelte';
	import { formatDate, formatArtistList } from '$lib/utils';

	// define props
	let { exhibition, typeTitle = 'Exhibition' } = $props();

	// destructure exhibition
	const { alternate_location, start_date, end_date, artists, featured_image, title } = exhibition;

	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});

	const formattedArtistList = formatArtistList(artists);
</script>

<a href={`/exhibitions/${exhibition.slug.current}`} class="exhibition-item-large block">
	<div class="titles px-sm-mid lg:px-base gap-base-mid lg:gap-base grid grid-cols-12">
		<div class="col-span-12 lg:col-span-6">
			{#if typeTitle}
				<p>{typeTitle}</p>
			{/if}

			{#if alternate_location}
				<div class="hidden lg:block">
					<Portable value={alternate_location} />
				</div>
			{/if}
		</div>

		<div class="col-span-12 lg:col-span-6">
			{#if formattedArtistList}
				<p>{formattedArtistList}</p>
			{/if}

			<p class="italic">{title}</p>

			{#if formattedDate}
				<p>{formattedDate}</p>
			{/if}

			{#if alternate_location}
				<div class="block lg:hidden">
					<Portable value={alternate_location} />
				</div>
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
			margin-top: var(--spacing-sm-mid);

			@media (min-width: 1024px) {
				margin-top: calc(var(--spacing-base) - 3px);
			}
		}
	}
</style>
