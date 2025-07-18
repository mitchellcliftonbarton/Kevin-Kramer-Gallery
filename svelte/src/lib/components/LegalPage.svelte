<script>
	import { PortableText } from '@portabletext/svelte';

	// define props
	let { data } = $props();
</script>

<div class="px-lg pb-lg pt-xxl">
	{#if data?.text}
		<div class="rich-text max-w-def-max mx-auto w-full lg:w-1/2">
			<PortableText value={data.text} />
		</div>
	{/if}
</div>
