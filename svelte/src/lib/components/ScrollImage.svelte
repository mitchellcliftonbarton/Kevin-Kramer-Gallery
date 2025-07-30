<script>
	import Portable from './Portable.svelte';

	// props
	let { media } = $props();

	// console.log(media);

	// desctructure media
	const {
		_type,
		alt,
		asset,
		file,
		vimeo_url,
		poster,
		groupIndex,
		mediaIndex,
		caption,
		mediaGroup
	} = media;

	// get meta info
	const isLandscape = $derived(
		_type === 'Video' ? true : asset?.metadata?.dimensions?.aspectRatio > 1
	);

	// check if media_group has multiple media
	const hasMultipleMedia = $derived(mediaGroup?.media?.length > 1);

	// index text
	const indexText = $derived(
		hasMultipleMedia ? `${groupIndex + 1}.${mediaIndex + 1}` : groupIndex + 1
	);
</script>

<div class={`media-item ${isLandscape ? 'landscape' : 'portrait'}`}>
	<figure class="bg-grey-1">
		{#if _type === 'Image' && asset?.url}
			<img data-src={asset.url} {alt} class="lazyload h-full w-full object-cover object-center" />
		{:else if _type === 'Video' && file?.asset?.url}
			<video
				class="lazyload h-full w-full object-cover object-center"
				autoplay
				muted
				playsinline
				preload
			>
				<source src={file.asset.url} type="video/mp4" />
			</video>
		{/if}
	</figure>

	{#if caption}
		<div class="px-sm mt-sm flex items-start gap-4 text-sm">
			<p>{indexText}</p>

			<Portable value={caption} />
		</div>
	{/if}
</div>

<style>
	.media-item {
		&.landscape {
			width: 100%;

			figure {
				aspect-ratio: 4/3;
			}
		}

		&.portrait {
			width: 100svh;

			figure {
				aspect-ratio: 3/4;
			}
		}
	}
</style>
