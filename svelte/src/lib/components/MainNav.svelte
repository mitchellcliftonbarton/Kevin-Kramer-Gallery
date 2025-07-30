<script>
	import { page } from '$app/state';
	import ExhibitionTitleInfo from './ExhibitionTitleInfo.svelte';
	import MainHomeLink from './MainHomeLink.svelte';
	import HomePageNav from './HomePageNav.svelte';

	// get current path
	let currentPath = $derived(page.url.pathname);

	// check if on home page
	let isHomePage = $derived(currentPath === '/');

	// check if on information page
	let isInformationPage = $derived(currentPath === '/information');

	// check if on legal page
	let isLegalPage = $derived(
		currentPath === '/accessibility' || currentPath === '/privacy' || currentPath === '/terms'
	);

	// check if on exhibition detail page
	let isExhibitionDetailPage = $derived(currentPath.includes('/exhibitions/'));
</script>

{#if isHomePage}
	<HomePageNav />
{:else}
	<header
		class={`fixed top-0 left-0 w-full ${isExhibitionDetailPage ? 'px-md py-md-minus' : 'px-lg py-lg-minus'}`}
	>
		<nav class="flex justify-between">
			{#if isLegalPage}
				<ul class="flex items-center gap-[0.2em]">
					<li>
						<a href="/accessibility" class={currentPath === '/accessibility' ? 'text-blue' : ''}
							>Accessibility</a
						><span>,</span>
					</li>
					<li>
						<a href="/privacy" class={currentPath === '/privacy' ? 'text-blue' : ''}>Privacy</a
						><span>,</span>
					</li>
					<li>
						<a href="/terms" class={currentPath === '/terms' ? 'text-blue' : ''}
							>Terms & Conditions</a
						>
					</li>
				</ul>

				<a href="/information" class="lg:hover:text-blue">Close</a>
			{:else if isExhibitionDetailPage}
				<ExhibitionTitleInfo />
			{:else if isInformationPage}
				<div class="flex-1"></div>

				<div class="flex flex-1 justify-center">
					<a href="/" class="text-blue">Information</a>
				</div>

				<div class="flex flex-1 justify-end">
					{#if isInformationPage}
						<a href="/" class="lg:hover:text-blue">Close</a>
					{/if}
				</div>
			{/if}
		</nav>
	</header>
{/if}

<style>
	header {
		z-index: 2000;
	}
</style>
