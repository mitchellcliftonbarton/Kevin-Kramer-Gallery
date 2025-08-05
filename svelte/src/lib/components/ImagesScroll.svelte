<script>
	import ScrollImage from './ScrollImage.svelte';

	// props
	let { media, setCarouselSlide } = $props();
</script>

<div class="images-scroll pb-lg pt-lg-mid lg:pt-xxl lg:pt-0">
	{#each media as media_item, index}
		<ScrollImage media={media_item} slideIndex={index} {setCarouselSlide} />
	{/each}
</div>

<style>
	.images-scroll {
		:global(.media-item + .media-item) {
			margin-top: var(--spacing-sm-mid);

			@media (min-width: 1024px) {
				margin-top: var(--spacing-base);
			}
		}
	}
</style>
