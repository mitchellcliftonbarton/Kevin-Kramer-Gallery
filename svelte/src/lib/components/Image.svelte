<script>
	import { urlFor } from '$lib/sanity/client';

	// define props
	let { imageUrl, alt, classes, width = 2200 } = $props();

	// get src
	const src = urlFor(imageUrl).width(width).url();
</script>

<img data-src={src} {alt} class={`lazyload ${classes}`} />
