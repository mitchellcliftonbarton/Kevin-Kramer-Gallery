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

	// get current path
	let currentPath = $derived(page.url.pathname);

	// define props
	let { children, data } = $props();

	// destructure some data
	const { siteSettings } = data;

	// Vars
	let loadingTimeout;

	// configure nprogress
	NProgress.configure({ showSpinner: false });

	if (typeof window !== 'undefined') {
		import('lazysizes');
	}

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
	});
</script>

<svelte:head>
	<meta property="og:title" content={siteSettings.title} />
	<meta property="og:site_name" content={siteSettings.title} />
	<meta property="og:locale" content="en_US" />
</svelte:head>

<div id="app" class={`${globalState.newsletterPopupActive ? 'newsletter-popup-active' : ''}`}>
	<MainNav />

	<main>
		{@render children()}
	</main>

	{#if currentPath === '/'}
		<MainFooter />
	{:else if currentPath.includes('/exhibitions/')}
		<footer class="p-lg flex items-center justify-center">
			<a href="/" class="text-blue">Kevin Kramer Gallery</a>
		</footer>
	{/if}

	<NewsletterPopup />
</div>
