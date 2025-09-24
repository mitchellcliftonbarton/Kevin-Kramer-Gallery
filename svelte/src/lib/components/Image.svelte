<script>
	import { urlFor } from '$lib/sanity/client';
	import { onMount } from 'svelte';

	// define props
	let { imageUrl, alt, classes, width = 2200, preload = false } = $props();

	// get src
	const src = urlFor(imageUrl).width(width).url();

	onMount(() => {
		if (preload) {
			const img = new Image();
			img.src = src;
			img.onload = () => {
				console.log('img preloaded:' + src);
			};
		}
	});
</script>

<img data-src={src} {alt} class={`lazyload ${classes}`} />
