<script>
	import Portable from '$lib/components/Portable.svelte';
	import ExhibitionItemLarge from '$lib/components/ExhibitionItemLarge.svelte';
	import ExhibitionItemSmall from '$lib/components/ExhibitionItemSmall.svelte';
	import PressItem from '$lib/components/PressItem.svelte';
	import MainHomeLink from '$lib/components/MainHomeLink.svelte';
	import PastExhibitions from '$lib/components/PastExhibitions.svelte';

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

<svelte:head>
	<title>Kevin Kramer Gallery</title>
	<meta property="og:title" content="Kevin Kramer Gallery" />
</svelte:head>

<div class="home pt-mobile-push lg:pt-xxl">
	{#if alert}
		<section class="alert text-green rich-text px-base-mid lg:px-lg col-span-2">
			<Portable value={alert} />
		</section>
	{/if}

	{#if currentExhibitions.length > 0 || upcomingExhibitions.length > 0}
		<section class="current-upcoming-exhibitions px-sm-mid lg:px-base">
			{#each currentExhibitions as exhibition}
				<ExhibitionItemLarge {exhibition} typeTitle="On View" />
			{/each}

			{#each upcomingExhibitions as exhibition}
				<ExhibitionItemLarge {exhibition} typeTitle="Upcoming" isLink={false} />
			{/each}
		</section>
	{/if}

	{#if featured_press?.length > 0}
		<section class="press px-base-mid lg:px-lg">
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

	{#if pastExhibitions.length > 0}
		<PastExhibitions {pastExhibitions} />
	{/if}
</div>

<style>
	.home {
		:global(& > section + section) {
			margin-top: var(--spacing-xl-minus);

			@media (min-width: 1024px) {
				margin-top: var(--spacing-xl);
			}
		}

		:global(& > .alert + section) {
			margin-top: 5rem;

			@media (min-width: 1024px) {
				margin-top: var(--spacing-xl);
			}
		}
	}

	.current-upcoming-exhibitions :global(> * + *) {
		margin-top: var(--spacing-lg-mid);

		@media (min-width: 1024px) {
			margin-top: var(--spacing-lg);
		}
	}

	.press {
		.press-items {
			:global(& > * + *) {
				margin-top: var(--spacing-line-break);
			}
		}
	}
</style>
