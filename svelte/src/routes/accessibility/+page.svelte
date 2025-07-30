<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { accessibilityData } = data;
</script>

<svelte:head>
	<title>Accessibility | Kevin Kramer Gallery</title>
	<meta property="og:title" content="Accessibility | Kevin Kramer Gallery" />
</svelte:head>

<LegalPage data={accessibilityData} />
