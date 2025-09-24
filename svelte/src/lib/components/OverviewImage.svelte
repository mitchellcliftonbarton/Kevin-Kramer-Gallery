<script>
	import Portable from './Portable.svelte';
	import Image from './Image.svelte';

	// props
	let { media, setCarouselSlide } = $props();

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
		mediaGroup,
		caption_override,
		slideIndex
	} = media;

	// get meta info
	const isLandscape = $derived(
		_type === 'Video' ? true : asset?.metadata?.dimensions?.aspectRatio > 1
	);

	const intrinsicAspectRatio = $derived(
		_type === 'Video' ? 16 / 9 : asset?.metadata?.dimensions?.aspectRatio
	);

	// check if media_group has multiple media
	const hasMultipleMedia = $derived(mediaGroup?.media?.length > 1);
</script>

<button
	class={`media-item ${isLandscape ? 'landscape' : 'portrait'}`}
	onclick={() => setCarouselSlide(slideIndex)}
>
	<p class="text-left text-sm">{groupIndex + 1}</p>

	<div class="image-container relative">
		<figure class="relative" style="aspect-ratio: {isLandscape ? 'auto' : intrinsicAspectRatio}">
			{#if _type === 'Image' && asset?.url}
				<Image imageUrl={asset.url} width={600} {alt} />
			{:else if _type === 'Video' && file?.asset?.url}
				<video
					class="lazyload h-full w-full object-cover object-center"
					autoplay
					muted
					playsinline
					preload
					poster={poster?.asset?.url}
				>
					<source src={file.asset.url} type="video/mp4" />
				</video>
			{/if}
		</figure>
	</div>

	{#if caption_override || caption}
		<div class="text-left text-sm">
			<Portable value={caption_override || caption} />
		</div>
	{/if}
</button>

<style>
	.media-item {
		&.landscape {
			.image-container {
				aspect-ratio: 4/3;

				figure {
					background-color: var(--color-grey-1);
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
				}

				:global(img) {
					object-fit: cover;
					object-position: center;
					width: 100%;
					height: 100%;
				}
			}
		}

		&.portrait {
			.image-container {
				aspect-ratio: 1;

				figure {
					height: 100%;
					width: auto;
					background-color: var(--color-grey-1);

					:global(img) {
						object-fit: cover;
						object-position: center;
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		& > * + * {
			margin-top: 0.6rem;
		}
	}
</style>
