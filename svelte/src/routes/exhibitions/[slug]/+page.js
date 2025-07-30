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
		exhibition_text,
		alternate_location,
		exhibition_details_override,
		additional_text_sections[],
		exhibition_media[]{
			media[]{
				_type,
				alt,
				asset->{
					...,
					metadata
				},
				file{
					asset->{
						...,
						metadata
					}
				},
				video_type,
				vimeo_url,
				poster{
					asset->{
						...,
						metadata
					},
					alt
				}
			},
			caption[]
		}
	}`);

	return {
		exhibition
	};
};
