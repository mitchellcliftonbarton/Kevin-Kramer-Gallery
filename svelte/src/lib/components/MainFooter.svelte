<script>
	import { page } from '$app/state';
	import { PortableText } from '@portabletext/svelte';
	import { replaceNewlinesInSpans } from '$lib/utils';

	const { siteSettings } = page?.data;

	// destructure site settings
	const { address, hours, contactInformation, socialLinks } = siteSettings;

	// replace newlines in spans
	let addressNoBreaks = replaceNewlinesInSpans(address);
	let hoursNoBreaks = replaceNewlinesInSpans(hours);
</script>

<footer class="px-lg pb-lg gap-base mt-xxxl grid grid-cols-12">
	<div class="col-span-6">
		{#if address}
			<div class="rich-text text-blue">
				<PortableText value={addressNoBreaks} />
			</div>
		{/if}

		{#if hours}
			<div class="rich-text text-blue">
				<PortableText value={hoursNoBreaks} />
			</div>
		{/if}
	</div>

	<div class="col-span-3">
		{#if contactInformation}
			<div class="rich-text text-blue">
				<PortableText value={contactInformation} />
			</div>
		{/if}
	</div>

	<div class="text-blue col-span-3 flex flex-col items-start">
		<button>Mailing List</button>
		{#each socialLinks as link}
			<a href={link.href} target={link.blank ? '_blank' : '_self'}>{link.linkText}</a>
		{/each}
	</div>
</footer>
