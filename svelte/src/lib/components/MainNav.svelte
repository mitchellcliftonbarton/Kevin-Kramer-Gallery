<script>
	import { page } from '$app/state';
	import ExhibitionTitleInfo from './ExhibitionTitleInfo.svelte';

	// get current path
	let currentPath = $derived(page.url.pathname);

	// set main link url
	let mainLinkUrl = $derived(currentPath === '/' ? '/information' : '/');

	// set hover text
	let mainLinkTextOverride = $state(null);
	let mainLinkText = $derived(
		mainLinkTextOverride || (currentPath === '/' ? 'Kevin Kramer Gallery' : 'Information')
	);

	// check if on legal page
	let isLegalPage = $derived(
		currentPath === '/accessibility' || currentPath === '/privacy' || currentPath === '/terms'
	);

	// check if on exhibition detail page
	let isExhibitionDetailPage = $derived(currentPath.includes('/exhibitions/'));

	// function to handle main link hover
	function handleMainLinkEnter() {
		if (currentPath === '/') {
			mainLinkTextOverride = 'Information';
		}
	}

	// function to handle main link hover
	function handleMainLinkLeave() {
		if (currentPath === '/') {
			mainLinkTextOverride = null;
		}
	}

	// reset mainLinkTextOverride on route navigation
	$effect(() => {
		// Access currentPath to make the effect reactive to route changes
		currentPath;
		mainLinkTextOverride = null;
	});
</script>

<header class={`fixed top-0 left-0 w-full ${isExhibitionDetailPage ? 'p-md' : 'p-lg'}`}>
	<nav class="flex justify-between">
		{#if isLegalPage}
			<ul class="flex items-center gap-[0.2em]">
				<li>
					<a href="/accessibility" class={currentPath === '/accessibility' ? 'text-blue' : ''}
						>Accessibility</a
					><span>,</span>
				</li>
				<li>
					<a href="/privacy" class={currentPath === '/privacy' ? 'text-blue' : ''}>Privacy</a><span
						>,</span
					>
				</li>
				<li>
					<a href="/terms" class={currentPath === '/terms' ? 'text-blue' : ''}>Terms & Conditions</a
					>
				</li>
			</ul>

			<a href="/information" class="lg:hover:text-blue">Close</a>
		{:else if isExhibitionDetailPage}
			<ExhibitionTitleInfo />
		{:else}
			<div class="flex-1"></div>

			<div class="flex flex-1 justify-center">
				<a
					href={mainLinkUrl}
					onmouseenter={handleMainLinkEnter}
					onmouseleave={handleMainLinkLeave}
					class="text-blue w-[200px] text-center"
				>
					{mainLinkText}
				</a>
			</div>

			<div class="flex flex-1 justify-end">
				{#if currentPath === '/information'}
					<a href="/" class="lg:hover:text-blue">Close</a>
				{/if}
			</div>
		{/if}
	</nav>
</header>
