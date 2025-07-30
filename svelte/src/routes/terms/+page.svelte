<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { termsData } = data;
</script>

<svelte:head>
	<title>Terms & Conditions | Kevin Kramer Gallery</title>
	<meta property="og:title" content="Terms & Conditions | Kevin Kramer Gallery" />
</svelte:head>

<LegalPage data={termsData} />
