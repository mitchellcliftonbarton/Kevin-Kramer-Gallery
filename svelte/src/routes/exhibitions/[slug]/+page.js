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
		press[]->{
			...,
			pdf{
				asset->{
					...,
					metadata
				}
			}
		},
		exhibition_text[]{
			...,
			markDefs[]{
				...,
				_type == "link" => {
					...,
					pdf{
						asset->{
							url
						}
					}
				}
			}
		},
		alternate_location,
		exhibition_details_override,
		additional_text_sections[]{
			...,
			text[]{
				...,
				markDefs[]{
					...,
					_type == "link" => {
						...,
						pdf{
							asset->{
								url
							}
						}
					}
				}
			}
		},
		featured_image{
			asset->{
				url
			}
		},
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
				caption_override,
				poster{
					asset->{
						url
					}
				}
			},
			caption[]
		}
	}`);

	return {
		exhibition
	};
};
