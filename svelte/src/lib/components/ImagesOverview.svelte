<script>
	import OverviewImage from './OverviewImage.svelte';

	// props
	let { media, setCarouselSlide } = $props();
</script>

<div
	class="images-overview pt-lg-mid lg:pt-xxl px-sm-mid lg:px-sm-plus pb-lg gap-sm-mid lg:gap-sm-plus grid grid-cols-2 items-start lg:grid-cols-4"
>
	{#each media as media_item, index}
		<OverviewImage media={media_item} slideIndex={index} {setCarouselSlide} />
	{/each}
</div>
