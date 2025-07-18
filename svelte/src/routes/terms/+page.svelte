<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { termsData } = data;
</script>

<LegalPage data={termsData} />
