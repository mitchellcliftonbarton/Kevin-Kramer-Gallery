<script>
	import { PortableText } from '@portabletext/svelte';

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
	<p class="text-sm">{indexText}</p>

	<figure class="relative">
		{#if _type === 'Image' && asset?.url}
			<img data-src={asset.url} {alt} class="lazyload" />
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
		<div class="text-sm">
			<PortableText value={caption} />
		</div>
	{/if}
</div>

<style>
	.media-item {
		&.landscape {
			figure {
				aspect-ratio: 4/3;

				img {
					object-fit: cover;
					object-position: center;
					width: 100%;
					height: 100%;
				}
			}
		}

		&.portrait {
			figure {
				aspect-ratio: 1;

				img {
					object-fit: contain;
					object-position: left;
					width: 100%;
					height: 100%;
				}
			}
		}

		& > * + * {
			margin-top: var(--spacing-xs);
		}
	}
</style>
