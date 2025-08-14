import { client } from '$lib/sanity/client.js';

export const load = async () => {
	const exhibitionProjection = `{
		_id,
		title,
		slug,
		start_date,
		end_date,
		featured_image{
			asset->{
				...,
				metadata
			}
		},
		alternate_location,
		artists_list_override,
		artists[]->{
			_id,
			name,
			slug
		}
	}`;

	const homeData = await client.fetch(
		`{
			"homePage": *[_type == "homePage"][0]{
				featured_press[]->{
					...,
					pdf{
						asset->{
							...,
							metadata
						}
					}
				}
			},
			"currentExhibitions": *[_type == "exhibition" && start_date <= now() && end_date >= now()] | order(start_date desc) ${exhibitionProjection},
			"upcomingExhibitions": *[_type == "exhibition" && start_date > now()] | order(start_date asc) ${exhibitionProjection},
			"pastExhibitions": *[_type == "exhibition" && end_date < now()] | order(end_date desc) ${exhibitionProjection}
		}`
	);

	// check if homeData was successfully fetched
	if (!homeData) {
		return {
			error: 'Home data not found'
		};
	}

	return {
		homeData
	};
};
