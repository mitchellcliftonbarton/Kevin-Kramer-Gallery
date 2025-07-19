<script>
	import { page } from '$app/state';
	import { formatDate, formatArtistList } from '$lib/utils';

	// destructure page data
	const { exhibition } = page?.data;

	// destructure exhibition
	const { title, start_date, end_date, artists } = exhibition;

	// check if 'view' is in search params
	const isImagesView = $derived(page.url.searchParams.get('view') === 'images');

	// check if 'layout' is in search params
	const isScrollLayout = $derived(page.url.searchParams.get('layout') === 'scroll');

	// format date
	const formattedDate = formatDate({
		startDate: start_date,
		endDate: end_date
	});

	// format artist list
	const formattedArtistList = formatArtistList(artists);

	let linkText = $state(null);

	$effect(() => {
		const parts = [];

		if (formattedArtistList) {
			parts.push(formattedArtistList);
		}

		if (title) {
			parts.push(`<span class="italic">${title}</span>`);
		}

		if (formattedDate) {
			parts.push(formattedDate);
		}

		linkText = parts.join(', ');
	});
</script>

<div class="pr-lg flex-1">
	<a href="/">{@html linkText}</a>
</div>

{#if !isImagesView}
	<a href={`${page.url.pathname}?view=images&layout=scroll`} class="text-blue">Images (12)</a>
{:else}
	<div class="flex w-1/3 flex-none items-center justify-between">
		<div>
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
