<script>
	import Portable from '$lib/components/Portable.svelte';
	import ExhibitionItemLarge from '$lib/components/ExhibitionItemLarge.svelte';
	import ExhibitionItemSmall from '$lib/components/ExhibitionItemSmall.svelte';
	import PressItem from '$lib/components/PressItem.svelte';

	// define props
	let { data } = $props();

	// destructure data
	const { homeData, siteSettings } = data;

	// destructure site settings
	const { alert } = siteSettings;

	// // destructure home data
	const { featured_press } = homeData?.homePage;

	// // destructure exhibitions
	const { currentExhibitions, upcomingExhibitions, pastExhibitions } = homeData;
</script>

<div class="home pt-xxl">
	{#if alert}
		<section class="alert text-green rich-text px-lg col-span-2">
			<Portable value={alert} />
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

	{#if featured_press?.length > 0}
		<section class="press px-lg">
			<div class="max-w-def-max mx-auto">
				<h2 class="text-center">Recent Press</h2>

				<div class="press-items mt-line-break">
					{#each featured_press as press}
						<PressItem {press} />
					{/each}
				</div>
			</div>
		</section>
	{/if}

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
			:global(& > * + *) {
				margin-top: var(--spacing-line-break);
			}
		}
	}
</style>
