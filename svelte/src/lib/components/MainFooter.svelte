<script>
	import { page } from '$app/state';
	import Portable from './Portable.svelte';
	import CopyButton from './CopyButton.svelte';
	import { replaceNewlinesInSpans } from '$lib/utils';
	import { globalState } from '$lib/state/state.svelte';

	const { siteSettings } = page?.data;

	// destructure site settings
	const { address, hours, email, contactInformation, socialLinks } = siteSettings;

	// replace newlines in spans
	let addressNoBreaks = replaceNewlinesInSpans(address);
	let hoursNoBreaks = replaceNewlinesInSpans(hours);

	const openNewsletterPopup = () => {
		document.body.style.overflow = 'hidden';
		globalState.newsletterPopupActive = true;
	};
</script>

<footer
	class="px-base-mid lg:px-lg pb-base-mid lg:pb-lg gap-base lg:gap-base mt-xxl lg:mt-xxxl grid grid-cols-12"
>
	<div class="col-span-12 text-sm lg:col-span-6 lg:text-base">
		{#if address}
			<div class="rich-text text-blue links-fade">
				<Portable value={addressNoBreaks} />
			</div>
		{/if}

		{#if hours}
			<div class="rich-text text-blue links-fade">
				<Portable value={hoursNoBreaks} />
			</div>
		{/if}
	</div>

	<div class="col-span-12 text-sm lg:col-span-3 lg:text-base">
		{#if email}
			<CopyButton
				textToCopy={email}
				buttonText={email}
				className="text-blue lg:hover:opacity-50 transition-opacity duration-300"
			/>
		{/if}

		{#if contactInformation}
			<div class="rich-text text-blue links-fade">
				<Portable value={contactInformation} />
			</div>
		{/if}
	</div>

	<div class="text-blue col-span-12 flex flex-col items-start text-sm lg:col-span-3 lg:text-base">
		<button
			onclick={openNewsletterPopup}
			class="transition-opacity duration-300 lg:hover:opacity-50"
		>
			Mailing List
		</button>
		{#each socialLinks as link}
			<a
				href={link.href}
				target={link.blank ? '_blank' : '_self'}
				class="transition-opacity duration-300 lg:hover:opacity-50">{link.linkText}</a
			>
		{/each}
	</div>
</footer>
