<script>
	import { PortableText } from '@portabletext/svelte';
	import ExhibitionItemLarge from '$lib/components/ExhibitionItemLarge.svelte';
	import ExhibitionItemSmall from '$lib/components/ExhibitionItemSmall.svelte';

	// define props
	let { data } = $props();

	console.log(data);

	// destructure data
	const { homeData, siteSettings } = data;

	// destructure site settings
	const { alert } = siteSettings;

	// // destructure home data
	const { featured_press } = homeData?.homePage;

	// // destructure exhibitions
	const { currentExhibitions, upcomingExhibitions, pastExhibitions, latestPress } = homeData;
</script>

<div class="home pt-xxl">
	{#if alert}
		<section class="alert text-green rich-text px-lg col-span-2">
			<PortableText value={alert} />
		</section>
	{/if}

	{#if currentExhibitions.length > 0 || upcomingExhibitions.length > 0}
		<section class="current-upcoming-exhibitions px-base">
			{#each currentExhibitions as exhibition}
				<ExhibitionItemLarge {exhibition} typeTitle="On View" />
			{/each}

			{#each upcomingExhibitions as exhibition}
				<ExhibitionItemLarge {exhibition} typeTitle="Upcoming" />
			{/each}
		</section>
	{/if}

	<section class="press px-lg">
		<div class="mx-auto w-full lg:w-1/2">
			<h2 class="text-center">Recent Press</h2>

			<div class="press-items mt-line-break">
				<div>
					<p>
						“Kayode Ojo Wants You to Question Your Relationship to Fashion”<br />Kat Herriman<br
						/><span class="italic">W Magazine</span><br />November 2023
					</p>
				</div>

				<div>
					<p>
						“Kayode Ojo Wants You to Question Your Relationship to Fashion”<br />Kat Herriman<br
						/><span class="italic">W Magazine</span><br />November 2023
					</p>
				</div>

				<div>
					<p>
						“Kayode Ojo Wants You to Question Your Relationship to Fashion”<br />Kat Herriman<br
						/><span class="italic">W Magazine</span><br />November 2023
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="past-exhibitions px-base">
		<div class="title px-base flex">
			<div class="flex-1"></div>
			<div class="flex flex-1 justify-center">
				<h2>Past Exhibitions</h2>
			</div>

			<div class="flex flex-1 justify-end gap-[.2em]">
				<div>
					<button>Images</button><span>,</span>
				</div>
				<div>
					<button>List</button>
				</div>
			</div>
		</div>

		<div class="past-exhibitions-list gap-base mt-line-break grid grid-cols-2">
			{#each pastExhibitions as exhibition}
				<ExhibitionItemSmall {exhibition} />
			{/each}
		</div>
	</section>
</div>

<style>
	.home {
		& > * + * {
			margin-top: var(--spacing-xl);
		}
	}

	.current-upcoming-exhibitions :global(> * + *) {
		margin-top: var(--spacing-lg);
	}

	.press {
		.press-items {
			& > * + * {
				margin-top: var(--spacing-line-break);
			}
		}
	}
</style>
