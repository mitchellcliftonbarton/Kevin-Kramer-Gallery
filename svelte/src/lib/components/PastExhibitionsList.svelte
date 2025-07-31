<script>
	import { formatExhibitionTitle } from '$lib/utils';
	import { onMount } from 'svelte';

	// props
	let { pastExhibitions } = $props();

	// state
	let currentImage = $state(null);
	let isLargeQuery = $state(false);

	// functions
	function handleMouseEnter(exhibition) {
		if (isLargeQuery) {
			currentImage = exhibition?.featured_image?.asset?.url;
		}
	}

	onMount(() => {
		if (window !== undefined) {
			isLargeQuery = window.matchMedia('(min-width: 1024px)').matches;
		}
	});
</script>

<div class="past-exhibitions-list lg:px-lg mt-base-mid lg:mt-line-break">
	<div class="max-w-def-max mx-auto">
		<div
			class="flex flex-col items-start"
			onmouseleave={() => (currentImage = null)}
			aria-hidden={!currentImage}
		>
			{#each pastExhibitions as exhibition}
				<a
					href={`/exhibitions/${exhibition.slug.current}`}
					class="lg:hover:text-blue"
					onmouseenter={() => handleMouseEnter(exhibition)}
					>{@html formatExhibitionTitle(exhibition)}</a
				>
			{/each}
		</div>
	</div>
</div>

<div
	class={`image relative hidden aspect-[4/3] lg:block ${currentImage ? 'opacity-100' : 'opacity-0'}`}
>
	<img src={currentImage} alt="" />
</div>

<style>
	.image {
		position: fixed;
		bottom: var(--spacing-base);
		left: var(--spacing-base);
		width: 250px;
		overflow: hidden;
		pointer-events: none;

		img {
			object-fit: cover;
			object-position: center;
			width: 100%;
			height: 100%;
		}
	}
</style>
