<script>
	import MainHomeLink from '$lib/components/MainHomeLink.svelte';
	import { onMount, onDestroy } from 'svelte';

	let headerElement;
	let lastScrollTop = $state(0);
	let trigger = 15;
	let isHidden = $state(false);

	function watch() {
		// get scroll top
		let st = window.pageYOffset || window.scrollY;

		if (lastScrollTop < trigger) {
			isHidden = false;
		} else {
			st > lastScrollTop ? (isHidden = true) : (isHidden = false);
		}

		lastScrollTop = st < 0 ? 0 : st;
	}

	onMount(() => {
		// Only run in browser
		if (typeof window === 'undefined') return;

		window.addEventListener('scroll', watch);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', watch);
		}
	});
</script>

<header
	bind:this={headerElement}
	class="px-sm-mid lg:px-lg py-base-mid lg:py-lg-minus fixed top-0 left-0 z-50 w-full"
	class:header-hidden={isHidden}
>
	<nav class="flex justify-center">
		<MainHomeLink />
	</nav>
</header>

<style>
	header {
		pointer-events: none;

		:global(a) {
			pointer-events: auto;
			opacity: 1;
			transition: opacity 0.2s;
			will-change: opacity;
			transform: translateZ(0); /* Force hardware acceleration */
			backface-visibility: hidden; /* Prevent flickering */
		}

		&.header-hidden {
			:global(a) {
				opacity: 0;
			}
		}
	}
</style>
