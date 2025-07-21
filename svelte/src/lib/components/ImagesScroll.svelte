<script>
	import ScrollImage from './ScrollImage.svelte';

	// props
	let { media } = $props();
</script>

<div class="images-scroll pb-lg">
	{#each media as media_item}
		<ScrollImage media={media_item} />
	{/each}
</div>

<style>
	.images-scroll {
		:global(.media-item + .media-item) {
			margin-top: var(--spacing-base);
		}
	}
</style>
