<script>
	import { PortableText } from '@portabletext/svelte';
	import { formatDate, formatArtistList } from '$lib/utils';

	// define props
	let { exhibition } = $props();

	// destructure exhibition
	const { alternate_location, start_date, end_date, artists, featured_image } = exhibition;

	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});

	const formattedArtistList = formatArtistList(artists);
</script>

<a href={`/exhibitions/${exhibition.slug.current}`} class="block">
	{#if featured_image?.asset?.url}
		<figure class="bg-grey-1 aspect-[4/3]">
			<img
				data-src={featured_image.asset.url}
				alt={exhibition.title}
				class="lazyload h-full w-full object-cover object-center"
			/>
		</figure>
	{/if}

	<div class="titles px-base mt-line-break">
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
</a>

<style>
	a {
		&:hover {
			color: var(--color-blue);
		}
	}
</style>
