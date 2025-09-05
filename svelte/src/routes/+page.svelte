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

<div class="px-md flex h-[100svh] items-center justify-center">
	<p class="text-blue hidden text-center lg:block">Kevin Kramer Gallery will open this fall</p>
	<p class="text-blue hello text-center lg:hidden">Kevin Kramer Gallery<br />will open this fall</p>

	<div class="p-md absolute bottom-0 left-0 w-full">
		<p class="text-blue hidden lg:block">121 West 27th Street #702, New York, NY 10001</p>
		<p class="text-blue lg:hidden">121 West 27th Street #702<br />New York, NY 10001</p>
	</div>
</div>

<style>
</style>
