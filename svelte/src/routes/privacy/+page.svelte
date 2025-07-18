<script>
	import LegalPage from '$lib/components/LegalPage.svelte';

	// define props
	let { data } = $props();

	const { privacyData } = data;
</script>

<LegalPage data={privacyData} />
