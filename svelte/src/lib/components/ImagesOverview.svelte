<script>
	import OverviewImage from './OverviewImage.svelte';

	// props
	let { media } = $props();
</script>

<div class="images-overview pt-xxl px-sm-plus pb-lg gap-sm-plus grid grid-cols-4">
	{#each media as media_item}
		<OverviewImage media={media_item} />
	{/each}
</div>

<style>
	/* .images-overview {
		:global(.media-item + .media-item) {
			margin-top: var(--spacing-base);
		}
	} */
</style>
