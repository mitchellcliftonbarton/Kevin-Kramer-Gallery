<script>
	import { PortableText } from '@portabletext/svelte';
	import PressItem from '$lib/components/PressItem.svelte';
	import TextSection from '$lib/components/TextSection.svelte';
	import { isWithinInterval } from 'date-fns';
	import { page } from '$app/state';
	import { replaceNewlinesInSpans } from '$lib/utils';
	import { toPlainText } from '@portabletext/svelte';

	console.log(page);

	// props
	let { data } = $props();

	// check if 'view' is in search params
	const isImagesView = $derived(page.url.searchParams.get('view') === 'images');

	// get site settings
	const { siteSettings } = page?.data;

	// destructure site settings
	const { address, hours } = siteSettings;

	// replace newlines in spans
	let addressNoBreaks = replaceNewlinesInSpans(address);
	let hoursNoBreaks = replaceNewlinesInSpans(hours);

	// get exhibition data
	const {
		press,
		exhibition_text,
		exhibition_text_caption_override,
		additional_text_sections,
		start_date,
		end_date
	} = data?.exhibition;

	// check if exhibition is current
	const isCurrent = isWithinInterval(new Date(), {
		start: new Date(start_date),
		end: new Date(end_date)
	});
</script>

<div class="exhibition-content px-lg pb-lg pt-xxl">
	{#if isImagesView}
		<div class="images-view">
			<h2 class="text-center">Images</h2>
		</div>
	{:else}
		<div class="max-w-def-max container mx-auto">
			{#if exhibition_text || isCurrent || exhibition_text_caption_override}
				<section class="exhibition-text">
					<div class="rich-text">
						<PortableText value={exhibition_text} />
					</div>

					{#if exhibition_text_caption_override}
						<div class="rich-text text-sm">
							<PortableText value={exhibition_text_caption_override} />
						</div>
					{:else if isCurrent}
						<div class="rich-text text-sm">
							<p>On view at {toPlainText(addressNoBreaks)}<br />{toPlainText(hoursNoBreaks)}</p>
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
	{/if}
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
			margin-top: var(--spacing-xl);
		}
	}

	.press-items {
		:global(& > * + *) {
			margin-top: var(--spacing-line-break);
		}
	}
</style>
