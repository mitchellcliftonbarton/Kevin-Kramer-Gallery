import { client } from '$lib/sanity/client.js';

export const prerender = true;

export const load = async () => {
	const privacyData = await client.fetch(
		`*[_type == "privacyPage"][0]{
      title,
      text
    }`
	);

	// check if informationData was successfully fetched
	if (!privacyData) {
		return {
			error: 'Privacy data not found'
		};
	}
	return {
		privacyData
	};
};
