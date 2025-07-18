<script>
	import { page } from '$app/state';
	import { formatDate, formatArtistList } from '$lib/utils';

	// destructure page data
	const { exhibition } = page?.data;

	// destructure exhibition
	const { title, start_date, end_date, artists } = exhibition;

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
