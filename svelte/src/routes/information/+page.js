import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const informationData = await client.fetch(
		`*[_type == "informationPage"][0]{
      newsletter_title,
			image{
				asset->{
					...,
					metadata
				},
				alt
			},
    }`
	);

	// check if informationData was successfully fetched
	if (!informationData) {
		return {
			error: 'Information data not found'
		};
	}

	// destructure the data a bit
	const { newsletter_title, image } = informationData;

	return {
		newsletter_title,
		image
	};
};
