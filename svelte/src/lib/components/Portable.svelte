<script>
	import { PortableText } from '@portabletext/svelte';
	import { components } from '$lib/utils';

	const { value } = $props();
</script>

<PortableText {value} {components} />
