<script>
	import MainHomeLink from '$lib/components/MainHomeLink.svelte';
	import { onMount, onDestroy } from 'svelte';

	let headerElement;
	let isVisible = $state(false);
	let isScrollingDown = $state(false);
	let lastScrollY = $state(0);
	let triggerDistance = $state(100);

	// Handle scroll event
	const handleScroll = () => {
		if (typeof window === 'undefined') return;

		const scrollY = window.scrollY;
		const isPastThreshold = scrollY > triggerDistance;

		if (isPastThreshold) {
			// Only track scroll direction when past threshold
			const isScrollingUp = scrollY < lastScrollY;
			isScrollingDown = !isScrollingUp;
			isVisible = isScrollingUp; // Show when scrolling up
		} else {
			// Always show when within 100px of top
			isVisible = true;
			isScrollingDown = false;
		}

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
	class="px-sm-mid lg:px-lg py-base-mid lg:py-lg-minus fixed top-0 left-0 w-full"
	class:visible={isVisible}
	class:scrolling-down={isScrollingDown}
>
	<nav class="flex justify-center">
		<MainHomeLink />
	</nav>
</header>

<style>
	header {
		pointer-events: none;

		:global(a) {
			transform: translateY(-15px);
			pointer-events: auto;
			transition:
				opacity 0.3s,
				transform 0.3s;
		}

		&.visible {
			:global(a) {
				opacity: 1;
				transform: translateY(0);
				transition: opacity 0.3s;
			}
		}

		&.scrolling-down {
			:global(a) {
				opacity: 0;
				transform: translateY(-15px);
			}
		}
	}
</style>
