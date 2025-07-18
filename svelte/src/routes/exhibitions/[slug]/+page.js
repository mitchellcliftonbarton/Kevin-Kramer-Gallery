import { client } from '$lib/sanity/client.js';

export const load = async ({ params }) => {
	const { slug = '' } = params || {};

	const exhibition = await client.fetch(`*[_type == "exhibition" && slug.current == "${slug}"][0]{
		title,
		artists[]->{
			name,
			slug
		},
		start_date,
		end_date,
		press[]->,
		exhibition_text
	}`);

	return {
		exhibition
	};
};
