<script>
	import MainHomeLink from '$lib/components/MainHomeLink.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap/all';

	let headerElement;
	let lastScrollTop = $state(0);
	let hasScrolled = $state(false);
	let headerHeight = $state(0);
	let currentTranslateY = $state(0);
	let isOpacityZero = $state(false);
	let ticking = false;

	function updateHeader() {
		// get scroll top
		let st = window.pageYOffset || window.scrollY;
		let scrollDelta = st - lastScrollTop;

		// Only proceed if there's actual scroll movement
		if (Math.abs(scrollDelta) < 1) {
			lastScrollTop = st;
			return;
		}

		if (st > lastScrollTop) {
			// WE ARE SCROLLING DOWN

			// Calculate new translate position (move header up)
			const newTranslateY = Math.min(currentTranslateY + Math.abs(scrollDelta), headerHeight);

			if (newTranslateY !== currentTranslateY) {
				currentTranslateY = newTranslateY;
				headerElement.style.transform = `translate3d(0, -${currentTranslateY}px, 0)`;

				if (isOpacityZero) {
					headerElement.style.opacity = '1';
					isOpacityZero = false;
				}
			}
		} else if (st < lastScrollTop) {
			// WE ARE SCROLLING UP

			if (currentTranslateY >= headerHeight) {
				// Header is completely out of view - snap back and fade in
				currentTranslateY = 0;
				headerElement.style.transform = 'translate3d(0, 0px, 0)';
				headerElement.style.opacity = '0';
				headerElement.style.transition = '';
				isOpacityZero = true;
			} else {
				// Header is partially visible - translate back at scroll speed
				const newTranslateY = Math.max(currentTranslateY - Math.abs(scrollDelta), 0);

				if (newTranslateY !== currentTranslateY) {
					currentTranslateY = newTranslateY;
					headerElement.style.transform = `translate3d(0, -${currentTranslateY}px, 0)`;
				}

				// check if opacity is 0
				if (isOpacityZero) {
					headerElement.style.transition = 'opacity 0.4s';
					headerElement.style.opacity = '1';
					isOpacityZero = false;
				}
			}
		}

		lastScrollTop = st < 0 ? 0 : st;
		hasScrolled = true;
		ticking = false;
	}

	function requestTick() {
		if (!ticking) {
			requestAnimationFrame(updateHeader);
			ticking = true;
		}
	}

	function watch() {
		requestTick();
	}

	onMount(() => {
		// Only run in browser
		if (typeof window === 'undefined') return;

		// set header height
		headerHeight = headerElement.offsetHeight;

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
>
	<nav class="flex justify-center">
		<MainHomeLink />
	</nav>
</header>

<style>
	header {
		pointer-events: none;
		will-change: transform, opacity;
		transform: translateZ(0); /* Force hardware acceleration */
		backface-visibility: hidden; /* Prevent flickering */

		:global(a) {
			pointer-events: auto;
		}
	}
</style>
