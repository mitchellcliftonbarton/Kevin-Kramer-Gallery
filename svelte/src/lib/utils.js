import { format, parseISO } from 'date-fns';
import Link from './components/Link.svelte';
import SmallCaps from './components/SmallCaps.svelte';

// setup components for portable text
export const components = {
	marks: {
		link: Link,
		smallcaps: SmallCaps
	}
};

export function replaceNewlinesInSpans(blocks) {
	return blocks.map((block) => {
		if (block._type === 'block' && Array.isArray(block.children)) {
			return {
				...block,
				children: block.children.map((child) => {
					if (child._type === 'span' && typeof child.text === 'string') {
						return {
							...child,
							text: child.text.replace(/\n/g, ', ')
						};
					}
					return child;
				})
			};
		}
		return block;
	});
}

export function formatDate({ startDate, endDate }) {
	// make sure we have both startDate and endDate
	if (!startDate || !endDate) {
		return false;
	}

	// Parse dates consistently to avoid SSR/client mismatch
	// Use parseISO for consistent date parsing across environments
	const start = parseISO(startDate);
	const end = parseISO(endDate);

	// check if startDate is before endDate
	if (start >= end) {
		return false;
	}

	// check if startDate and endDate are the same day
	if (start.toDateString() === end.toDateString()) {
		return format(start, 'MMM d, yyyy');
	}

	// check if both dates are in the same year
	if (start.getFullYear() === end.getFullYear()) {
		// check if both dates are in the same month
		if (start.getMonth() === end.getMonth()) {
			// Same month: "Oct 3 – 6, 2025"
			return `${format(start, 'MMM d')} – ${format(end, 'd yyyy')}`;
		} else {
			// Same year, different months: "3 Oct – 6 Dec, 2025"
			return `${format(start, 'd MMM')} – ${format(end, 'd MMM yyyy')}`;
		}
	} else {
		// Different years: "3 Oct 2025 – 2 January, 2026"
		return `${format(start, 'd MMM yyyy')} – ${format(end, 'd MMMM yyyy')}`;
	}
}

export function formatArtistList(artists) {
	// if there are no artists, return false
	if (!artists || artists.length === 0) {
		return false;
	}

	// if there are more than 5 artists, return "Group Show"
	if (artists.length > 5) {
		return 'Group Show';
	}

	// if there's only one artist, return just the name
	if (artists.length === 1) {
		return artists[0].name;
	}

	// if there are 2 artists, format with "&"
	if (artists.length === 2) {
		return `${artists[0].name} & ${artists[1].name}`;
	}

	// if there are 3-5 artists, return comma-separated list
	return artists.map((artist) => artist.name).join(', ');
}

// flatten exhibition media
export function flattenExhibitionMedia(media) {
	return media.flatMap((mediaGroup, groupIndex) =>
		mediaGroup.media.map((media, mediaIndex) => ({
			...media,
			groupIndex,
			mediaIndex,
			mediaGroup,
			caption: mediaGroup.caption
		}))
	);
}
