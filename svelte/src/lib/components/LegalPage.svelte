<script>
	import Portable from './Portable.svelte';
	import { components } from '$lib/utils';

	// define props
	let { data } = $props();
</script>

<div class="px-base-mid lg:px-lg pb-lg pt-xxl">
	{#if data?.text}
		<div class="rich-text max-w-def-max mx-auto w-full lg:w-1/2">
			<Portable value={data.text} />
		</div>
	{/if}
</div>
