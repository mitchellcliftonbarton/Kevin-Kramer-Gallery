import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
	projectId: 'ii4ohxov',
	dataset: 'production',
	apiVersion: '2024-07-19',
	useCdn: true
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
	return builder.image(source);
};

export const getImageHeight = (width, aspectRatio) => {
	return width / aspectRatio;
};
