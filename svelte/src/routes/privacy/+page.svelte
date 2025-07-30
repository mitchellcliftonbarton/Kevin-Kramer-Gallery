<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { privacyData } = data;
</script>

<svelte:head>
	<title>Privacy | Kevin Kramer Gallery</title>
	<meta property="og:title" content="Privacy | Kevin Kramer Gallery" />
</svelte:head>

<LegalPage data={privacyData} />
