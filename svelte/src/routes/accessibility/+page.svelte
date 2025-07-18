<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { accessibilityData } = data;
</script>

<LegalPage data={accessibilityData} />
