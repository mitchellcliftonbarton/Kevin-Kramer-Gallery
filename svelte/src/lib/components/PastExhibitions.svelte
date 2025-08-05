<script>
	import ExhibitionItemSmall from './ExhibitionItemSmall.svelte';
	import PastExhibitionsList from './PastExhibitionsList.svelte';

	// props
	let { pastExhibitions } = $props();

	// state
	let isList = $state(false);
</script>

<section class="past-exhibitions px-sm-mid lg:px-base" class:is-list={isList}>
	<div class="title px-sm-mid lg:px-base flex flex-col lg:flex-row">
		<div class="hidden flex-1 lg:block"></div>

		<div class="flex flex-1 justify-center">
			<h2 class="text-center">Past Exhibitions</h2>
		</div>

		<div
			class="view-toggle mt-base-mid flex flex-1 justify-start gap-[.2em] lg:mt-0 lg:justify-end"
		>
			<div>
				<button onclick={() => (isList = false)} class:active={!isList}>Images</button><span>,</span
				>
			</div>
			<div>
				<button onclick={() => (isList = true)} class:active={isList}>List</button>
			</div>
		</div>
	</div>

	<div class="relative">
		<PastExhibitionsList {pastExhibitions} />

		<div
			class="past-exhibitions-grid gap-sm-mid lg:gap-base mt-base-mid lg:mt-line-break grid grid-cols-2"
		>
			{#each pastExhibitions as exhibition}
				<ExhibitionItemSmall {exhibition} />
			{/each}
		</div>
	</div>
</section>

<style>
	.view-toggle {
		button {
			&.active {
				color: var(--color-blue);
			}
		}
	}

	.past-exhibitions {
		:global(.past-exhibitions-list) {
			display: none;
		}

		&.is-list {
			:global(.past-exhibitions-list) {
				display: block;
			}

			.past-exhibitions-grid {
				visibility: hidden;
			}
		}
	}
</style>
