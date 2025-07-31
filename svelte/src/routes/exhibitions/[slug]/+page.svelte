<script>
	import Portable from '$lib/components/Portable.svelte';
	import PressItem from '$lib/components/PressItem.svelte';
	import TextSection from '$lib/components/TextSection.svelte';
	import ImagesScroll from '$lib/components/ImagesScroll.svelte';
	import ImagesOverview from '$lib/components/ImagesOverview.svelte';
	import { isWithinInterval } from 'date-fns';
	import { page } from '$app/state';
	import { replaceNewlinesInSpans, flattenExhibitionMedia } from '$lib/utils';
	import { toPlainText } from '@portabletext/svelte';
	import EmblaCarousel from 'embla-carousel';
	import { onMount } from 'svelte';

	// props
	let { data } = $props();

	// state
	let emblaApi = $state(null);
	let emblaEl = $state(null);
	let carouselInit = $state(false);
	let emblaSlides = $state(null);
	let emblaVideoEls = $state(null);
	let carouselActive = $state(false);
	let isLargeQuery = $state(false);

	// state for checking carousel clicks
	let startX = $state(null);
	let startY = $state(null);
	let threshold = 2;
	let mouseIsDown = $state(false);

	// check if 'view' is in search params
	const isImagesView = $derived(page.url.searchParams.get('view') === 'images');

	// check if 'layout' is in search params
	const isScrollLayout = $derived(page.url.searchParams.get('layout') === 'scroll');

	// get site settings
	const { siteSettings } = page?.data;

	// destructure site settings
	const { address, hours } = siteSettings;

	// replace newlines in spans
	let addressNoBreaks = replaceNewlinesInSpans(address);
	let hoursNoBreaks = replaceNewlinesInSpans(hours);

	// get exhibition data
	const {
		title,
		press,
		exhibition_text,
		exhibition_details_override,
		additional_text_sections,
		start_date,
		end_date,
		exhibition_media,
		alternate_location,
		featured_image
	} = data?.exhibition;

	// check if exhibition is current
	const isCurrent = isWithinInterval(new Date(), {
		start: new Date(start_date),
		end: new Date(end_date)
	});

	// generate new exhibition_media array that flattens the array with group information
	const flattenedExhibitionMedia = $derived(
		exhibition_media ? flattenExhibitionMedia(exhibition_media) : []
	);

	onMount(() => {
		if (window !== undefined) {
			isLargeQuery = window.matchMedia('(min-width: 1024px)').matches;
		}

		if (emblaEl) {
			emblaApi = EmblaCarousel(emblaEl, {
				loop: true,
				dragThreshold: 10,
				duration: 20,
				startIndex: 0
				// watchDrag: !isLargeQuery
			});

			emblaApi.on('init', () => {
				carouselInit = true;
				emblaSlides = emblaApi.slideNodes();

				let videoEls = [];

				// loop through slides and find video elements
				emblaSlides.forEach((slide) => {
					let videoEl = slide.querySelector('video');
					if (videoEl) {
						videoEls.push(videoEl);
					}
				});

				emblaVideoEls = videoEls;
			});

			emblaApi.on('select', () => {
				emblaVideoEls.forEach((videoEl) => {
					videoEl.currentTime = 0;
				});
			});
		}
	});

	// keyboard events
	function onKeyDown(event) {
		if (!emblaApi) return;

		if (event.key === 'ArrowRight') {
			emblaApi.scrollNext();
		} else if (event.key === 'ArrowLeft') {
			emblaApi.scrollPrev();
		} else if (event.key === 'Escape') {
			carouselActive = false;
		}
	}

	// set carousel slide
	function setCarouselSlide(slideIndex) {
		emblaVideoEls.forEach((videoEl) => {
			videoEl.currentTime = 0;
		});

		emblaApi.scrollTo(slideIndex, true);
		carouselActive = true;
	}

	// effect for when carousel is active
	$effect(() => {
		if (carouselActive) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'initial';
		}
	});

	// prevent default action on carousel click
	function handleCarouselClick(e) {
		e.preventDefault();
	}

	// handle carousel mouse down
	function handleCarouselMouseDown(e) {
		startX = e.clientX;
		startY = e.clientY;
		mouseIsDown = true;

		// console.log('mouse down');
	}

	// handle carousel mouse up
	function handleCarouselMouseUp(e) {
		mouseIsDown = false;

		const deltaX = e.clientX - startX;
		const deltaY = e.clientY - startY;

		// Check if the movement is within the threshold
		if (Math.abs(deltaX) <= threshold && Math.abs(deltaY) <= threshold) {
			// This is a click action
			e.preventDefault(); // Prevent default action if necessary

			carouselActive = false;

			// console.log('mouse up, was click');
		} else {
			// console.log('mouse up, was drag');
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

<svelte:head>
	<title>{title} | Kevin Kramer Gallery</title>
	<meta property="og:title" content="{title} | Kevin Kramer Gallery" />
	{#if featured_image?.asset?.url}
		<meta property="og:image" content={featured_image.asset.url} />
	{/if}
</svelte:head>

<div class="exhibition-content">
	{#if isImagesView && !isScrollLayout}
		{#if flattenedExhibitionMedia}
			<ImagesOverview media={flattenedExhibitionMedia} {setCarouselSlide} />
		{/if}
	{:else if isImagesView && isScrollLayout}
		{#if flattenedExhibitionMedia}
			<ImagesScroll media={flattenedExhibitionMedia} {setCarouselSlide} />
		{/if}
	{:else}
		<div class="pt-xxl px-base-mid lg:px-lg pb-lg">
			<div class="max-w-def-max container mx-auto">
				{#if exhibition_text || isCurrent || exhibition_details_override}
					<section class="exhibition-text">
						<div class="rich-text">
							<Portable value={exhibition_text} />
						</div>

						{#if exhibition_details_override}
							<div class="rich-text text-sm">
								<Portable value={exhibition_details_override} />
							</div>
						{:else if isCurrent}
							<div class="rich-text text-sm">
								{#if alternate_location}
									<Portable value={alternate_location} />
								{:else}
									<p>On view at {toPlainText(addressNoBreaks)}<br />{toPlainText(hoursNoBreaks)}</p>
								{/if}
							</div>
						{:else if alternate_location}
							<div class="rich-text text-sm">
								<Portable value={alternate_location} />
							</div>
						{/if}
					</section>
				{/if}

				{#if additional_text_sections}
					{#each additional_text_sections as section}
						<TextSection {section} />
					{/each}
				{/if}

				{#if press}
					<section class="press-section">
						<h2 class="text-center">Press</h2>

						<div class="press-items mt-line-break">
							{#each press as pressItem}
								<PressItem press={pressItem} />
							{/each}
						</div>
					</section>
				{/if}
			</div>
		</div>
	{/if}
</div>

<div
	class="exhibition-carousel fixed top-0 left-0 h-full w-full bg-white"
	class:active={carouselActive}
	onmousedown={(e) => handleCarouselMouseDown(e)}
	onmouseup={(e) => handleCarouselMouseUp(e)}
	onclick={(e) => handleCarouselClick(e)}
	aria-hidden={!carouselActive}
>
	<div class="embla" bind:this={emblaEl}>
		<div class="embla__container">
			{#each flattenedExhibitionMedia as media}
				{#if media?._type === 'Image'}
					<div
						class={`embla__slide relative ${media?.asset?.metadata?.dimensions?.aspectRatio > 1 ? 'landscape' : 'portrait'}`}
					>
						<figure>
							<img
								data-src={media?.asset?.url}
								alt={media?.alt}
								class="lazyload h-full w-full object-cover object-center"
							/>
						</figure>
					</div>
				{:else if media?._type === 'Video'}
					<div class="embla__slide video relative">
						<figure>
							<video
								src={media?.file?.asset?.url}
								autoplay
								muted
								loop
								playsinline
								class="h-full w-full object-cover object-center"
							></video>
						</figure>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	.exhibition-content {
		min-height: 100svh;
	}

	.exhibition-text {
		& > * + * {
			margin-top: var(--spacing-base);
		}
	}

	.container {
		:global(& > * + *) {
			margin-top: var(--spacing-xl-minus);

			@media (min-width: 1024px) {
				margin-top: var(--spacing-xl);
			}
		}
	}

	.press-items {
		:global(& > * + *) {
			margin-top: var(--spacing-line-break);
		}
	}

	.exhibition-carousel {
		z-index: 5000;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;

		&.active {
			opacity: 1;
			pointer-events: auto;
		}

		.embla {
			overflow: hidden;
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}

		.embla__container {
			display: flex;
			position: absolute;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
		}

		.embla__slide {
			flex: 0 0 100%;
			min-width: 0;
			margin-right: 15vw;
			margin-left: 15vw;
			padding: var(--spacing-base-mid);
			display: flex;
			align-items: center;
			justify-content: center;

			@media screen and (min-width: 1024px) {
				margin-right: 0;
				margin-left: 0;
				padding: var(--spacing-lg);
			}

			figure {
				max-height: 100%;
				max-width: 100%;
			}

			&.landscape {
				figure {
					aspect-ratio: 4/3;
				}
			}

			&.portrait {
				figure {
					aspect-ratio: 3/4;
				}
			}

			&.video {
				figure {
					aspect-ratio: 16/9;
				}
			}
		}
	}
</style>
