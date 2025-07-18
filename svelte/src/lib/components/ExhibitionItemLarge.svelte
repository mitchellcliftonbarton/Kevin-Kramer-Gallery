<script>
	import { PortableText } from '@portabletext/svelte';
	import { formatDate, formatArtistList } from '$lib/utils';
	// import Image from './Image.svelte';

	// define props
	let { exhibition, typeTitle = 'Exhibition' } = $props();

	// destructure exhibition
	const { alternate_location, start_date, end_date, artists, featured_image } = exhibition;

	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});

	const formattedArtistList = formatArtistList(artists);
</script>

<a href={`/exhibitions/${exhibition.slug.current}`} class="block">
	<div class="titles px-base gap-base grid grid-cols-12">
		<div class="col-span-6">
			{#if typeTitle}
				<p>{typeTitle}</p>
			{/if}

			{#if alternate_location}
				<PortableText value={alternate_location} />
			{/if}
		</div>

		<div class="col-span-6">
			{#if formattedArtistList}
				<p>{formattedArtistList}</p>
			{/if}

			<p class="italic">{exhibition.title}</p>

			{#if formattedDate}
				<p>{formattedDate}</p>
			{/if}
		</div>
	</div>

	{#if featured_image?.asset?.url}
		<figure class="bg-grey-1 mt-base aspect-[4/3] overflow-hidden">
			<img
				data-src={featured_image.asset.url}
				alt={exhibition.title}
				class="lazyload h-full w-full object-cover object-center"
			/>
		</figure>
	{/if}
</a>

<style>
	a {
		&:hover {
			color: var(--color-blue);
		}
	}
</style>
