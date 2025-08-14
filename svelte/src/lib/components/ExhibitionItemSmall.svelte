<script>
	import Portable from './Portable.svelte';
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

	<div class="titles px-sm-mid lg:px-base text-sm lg:text-base">
		<div class="col-span-6">
			{#if formattedArtistList}
				<p>{formattedArtistList}</p>
			{/if}

			<p class="italic">{exhibition.title}</p>

			{#if formattedDate}
				<p>{formattedDate}</p>
			{/if}

			{#if alternate_location}
				<div>
					<Portable value={alternate_location} />
				</div>
			{/if}
		</div>
	</div>
</a>

<style>
	a {
		/* @media (min-width: 1024px) {
			&:hover {
				color: var(--color-blue);
			}
		} */

		&:hover {
			color: var(--color-blue);
		}
	}

	.titles {
		margin-top: var(--spacing-xs);

		@media (min-width: 1024px) {
			margin-top: calc(var(--spacing-base) - 3px);
		}
	}
</style>
