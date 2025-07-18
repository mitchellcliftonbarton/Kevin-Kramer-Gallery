import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const exhibitions = await client.fetch(`*[_type == "exhibition"]`);

	return {
		exhibitions
	};
};
