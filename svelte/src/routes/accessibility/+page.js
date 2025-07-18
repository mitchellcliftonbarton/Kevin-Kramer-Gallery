import { client } from '$lib/sanity/client.js';

export const prerender = true;

export const load = async () => {
	const accessibilityData = await client.fetch(
		`*[_type == "accessibilityPage"][0]{
      title,
      text
    }`
	);

	// check if informationData was successfully fetched
	if (!accessibilityData) {
		return {
			error: 'Accessibility data not found'
		};
	}
	return {
		accessibilityData
	};
};
