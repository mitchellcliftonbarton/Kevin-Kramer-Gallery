<script>
	import Portable from './Portable.svelte';
	import { formatExhibitionTitle, formatArtistList, formatDate } from '$lib/utils';
	import { toPlainText } from '@portabletext/svelte';
	import Image from './Image.svelte';

	// define props
	let { exhibition, typeTitle = 'Exhibition', isLink = true } = $props();

	// destructure exhibition
	const { featured_image, title, start_date, end_date, alternate_location } = exhibition;

	const formattedExhibitionTitle = formatExhibitionTitle(exhibition);
	const formattedArtistList = formatArtistList(exhibition.artists);

	// formatted date
	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});
</script>

<svelte:element
	this={isLink ? 'a' : 'div'}
	href={`/exhibitions/${exhibition.slug.current}`}
	class="exhibition-item-large block"
>
	<div class="titles px-sm-mid lg:px-base gap-base-mid lg:gap-base grid grid-cols-12">
		<div class="col-span-12">
			{#if typeTitle}
				<p>{typeTitle}</p>
			{/if}

			{#if formattedExhibitionTitle}
				<div class="hidden lg:block">{@html formattedExhibitionTitle}</div>

				<div class="block lg:hidden">
					{#if formattedArtistList}
						<p>{formattedArtistList}</p>
					{/if}

					<p class="italic">{title}</p>

					{#if formattedDate && alternate_location}
						<p>{formattedDate}<br />at {toPlainText(alternate_location)}</p>
					{:else if formattedDate}
						<p>{formattedDate}</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if featured_image?.asset?.url}
		<figure class="bg-grey-1 aspect-[4/3] overflow-hidden">
			<Image
				imageUrl={featured_image.asset.url}
				alt={title}
				classes="h-full w-full object-cover object-center"
			/>
		</figure>
	{/if}
</svelte:element>

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
