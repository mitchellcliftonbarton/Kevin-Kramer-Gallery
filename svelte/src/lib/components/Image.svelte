<script>
	import { urlFor } from '$lib/sanity/client';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	let { image, alt, disableLazyLoading, classes, maxSize = 'lg' } = $props();

	let imgElement;

	// setup event dispatcher
	const dispatch = createEventDispatcher();

	// build image urls
	let imageUrls = $state([]);
	const sizeObjects = [
		{
			name: 'sm',
			width: 500
		},
		{
			name: 'md',
			width: 800
		},
		{
			name: 'lg',
			width: 1500
		}
	];

	// build image url array
	$effect(() => {
		imageUrls = [];

		for (const size of sizeObjects) {
			const imageUrl = urlFor(image.asset.url).width(size.width).url();
			imageUrls.push({ width: size.width, url: imageUrl });

			if (size.name === maxSize) {
				break;
			}
		}
	});

	// build srcset and sizes strings
	const srcset = $derived(imageUrls.map((image) => `${image.url} ${image.width}w`).join(', '));
	const sizes = $derived(
		imageUrls.map((image) => `(max-width: ${image.width}px) ${image.width}px`).join(', ')
	);

	// on mount
	onMount(() => {
		if (imgElement) {
			imgElement.addEventListener('lazyloaded', () => {
				dispatch('lazyLoaded');
			});
		}
	});
</script>

<img
	bind:this={imgElement}
	data-srcset={srcset}
	{sizes}
	{alt}
	loading={disableLazyLoading ? 'eager' : 'lazy'}
	fetchpriority={disableLazyLoading ? 'high' : 'auto'}
	class={`lazyload ${classes}`}
/>
