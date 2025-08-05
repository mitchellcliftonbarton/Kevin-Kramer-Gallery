<script>
	import { page } from '$app/state';
	import {
		formatExhibitionTitle,
		flattenExhibitionMedia,
		formatDate,
		formatArtistList
	} from '$lib/utils';
	import { toPlainText } from '@portabletext/svelte';

	// destructure page data
	const { exhibition } = page?.data;

	// destructure exhibition
	const { title, start_date, end_date, artists, exhibition_media, alternate_location } = exhibition;

	// check if 'view' is in search params
	const isImagesView = $derived(page.url.searchParams.get('view') === 'images');

	// check if 'layout' is in search params
	const isScrollLayout = $derived(page.url.searchParams.get('layout') === 'scroll');

	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});

	const formattedArtistList = formatArtistList(artists);

	let linkText = $state(formatExhibitionTitle(exhibition));

	// get total number of images
	const totalImages = $derived(
		exhibition_media ? flattenExhibitionMedia(exhibition_media).length : 0
	);
</script>

<div class="pr-base lg:pr-lg w-1/2 flex-1 lg:w-full">
	<a href="/" class="hidden lg:block">{@html linkText} ×</a>
</div>

{#if !isImagesView}
	{#if totalImages > 0}
		<a href={`${page.url.pathname}?view=images&layout=scroll`} class="text-blue"
			>Images ({totalImages})</a
		>
	{/if}
{:else}
	<div class="flex flex-none items-start justify-between lg:w-1/3 lg:items-center">
		<div class="hidden lg:block">
			<a
				href={`${page.url.pathname}?view=images&layout=scroll`}
				class={isScrollLayout ? 'text-blue' : ''}>Scroll</a
			><span>,&nbsp;</span><a
				href={`${page.url.pathname}?view=images&layout=overview`}
				class={!isScrollLayout ? 'text-blue' : ''}>Overview</a
			>
		</div>

		<a href={page.url.pathname} class="text-blue">Text</a>
	</div>
{/if}
