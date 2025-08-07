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

<div class="past-exhibitions-list px-sm-mid lg:px-lg absolute top-0 left-0 w-full">
	<div class="max-w-def-max mx-auto">
		<div
			class="flex flex-col items-start"
			onmouseleave={() => (currentImage = null)}
			aria-hidden={!currentImage}
		>
			{#each pastExhibitions as exhibition}
				<a
					href={`/exhibitions/${exhibition.slug.current}`}
					class="past-exhibitions-list-item inline-block"
					onmouseenter={() => handleMouseEnter(exhibition)}
					>{@html formatExhibitionTitle(exhibition)}</a
				>
			{/each}
		</div>
	</div>
</div>

<div class="image-container fill-parent pointer-events-none flex items-end justify-start">
	<div class={`image hidden aspect-[4/3] lg:block ${currentImage ? 'opacity-100' : 'opacity-0'}`}>
		<img src={currentImage} alt="" />
	</div>
</div>

<style>
	.image {
		width: 250px;
		position: sticky;
		bottom: var(--spacing-base);
		left: 0px;
		overflow: hidden;

		img {
			object-fit: cover;
			object-position: center;
			width: 100%;
			height: 100%;
		}
	}

	.past-exhibitions-list-item {
		padding-left: var(--spacing-sm-mid);
		text-indent: calc(var(--spacing-sm-mid) * -1);

		@media (min-width: 1024px) {
			padding-left: var(--spacing-base);
			text-indent: calc(var(--spacing-base) * -1);
		}

		&:hover {
			color: var(--color-blue);
		}
	}
</style>
