import { client } from '$lib/sanity/client.js';

export const prerender = true;

export const load = async () => {
	const termsData = await client.fetch(
		`*[_type == "termsPage"][0]{
      title,
      text
    }`
	);

	// check if informationData was successfully fetched
	if (!termsData) {
		return {
			error: 'Terms data not found'
		};
	}
	return {
		termsData
	};
};
