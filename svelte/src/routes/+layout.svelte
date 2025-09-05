<script>
	import '../styles/global.css';
	import { page } from '$app/state';
	import MainNav from '$lib/components/MainNav.svelte';
	import MainFooter from '$lib/components/MainFooter.svelte';
	import NewsletterPopup from '$lib/components/NewsletterPopup.svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { globalState } from '$lib/state/state.svelte';
	import { loadGoogleAnalytics } from '$lib/utils';
	import { onMount } from 'svelte';

	// google analytics tracking id
	const GA_TRACKING_ID = 'G-8K1F5QQEWD';

	// get current path
	let currentPath = $derived(page.url.pathname);

	// define props
	let { children, data } = $props();

	// destructure some data
	const { siteSettings } = data;
	const { featured_image } = page?.data?.exhibition || {};

	// Vars
	let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	if (typeof window !== 'undefined') {
		import('lazysizes');
	}

	// onMount
	onMount(() => {
		loadGoogleAnalytics(GA_TRACKING_ID);
	});

	// handle navigation
	beforeNavigate(() => {
		// start nprogress
		NProgress.start();

		// set loading timeout
		loadingTimeout = setTimeout(() => {
			document.body.classList.add('loading');
		}, 100);
	});

	afterNavigate(() => {
		// stop nprogress
		NProgress.done();

		// clear loading timeout
		clearTimeout(loadingTimeout);

		// remove loading class
		document.body.classList.remove('loading');

		// send page view to google analytics
		if (typeof window !== 'undefined' && window.gtag) {
			window.gtag('event', 'page_view', {
				page_path: window.location.pathname,
				page_title: document.title
			});
		}
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="Kevin Kramer Gallery" />
	<meta property="og:locale" content="en_US" />
	{#if featured_image?.asset?.url}
		<meta property="og:image" content={featured_image.asset.url} />
	{:else if siteSettings?.ogImage?.asset?.url}
		<meta property="og:image" content={siteSettings.ogImage.asset.url} />
	{/if}
</svelte:head>

<div id="app" class={`${globalState.newsletterPopupActive ? 'newsletter-popup-active' : ''}`}>
	<main>
		{@render children()}
	</main>
</div>
