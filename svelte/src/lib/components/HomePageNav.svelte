<script>
	import MainHomeLink from '$lib/components/MainHomeLink.svelte';
	import { onMount, onDestroy } from 'svelte';

	let headerElement;
	let isVisible = $state(false);
	let lastScrollY = $state(0);
	let triggerDistance = $state(400);

	// Handle scroll event
	const handleScroll = () => {
		if (typeof window === 'undefined') return;

		const scrollY = window.scrollY;
		const isScrollingUp = scrollY < lastScrollY;
		const isPastThreshold = scrollY > triggerDistance;

		isVisible = isScrollingUp && isPastThreshold;
		lastScrollY = scrollY;
	};

	onMount(() => {
		// Only run in browser
		if (typeof window === 'undefined') return;

		// Add scroll listener
		window.addEventListener('scroll', handleScroll);

		// Check initial scroll position
		handleScroll();
	});

	onDestroy(() => {
		// Clean up scroll listener
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header
	bind:this={headerElement}
	class="px-lg py-lg-minus fixed top-0 left-0 w-full"
	class:visible={isVisible}
>
	<nav class="flex justify-center">
		<MainHomeLink />
	</nav>
</header>

<style>
	header {
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	header.visible {
		opacity: 1;
		pointer-events: auto;
	}
</style>
