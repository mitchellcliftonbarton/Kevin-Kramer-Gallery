<script>
	import Portable from './Portable.svelte';
	const { section } = $props();

	const { heading, text } = section;
</script>

<section class="additional-text-section">
	{#if heading}
		<h2 class="text-center">{heading}</h2>
	{/if}

	{#if text}
		<div class="rich-text">
			<Portable value={text} />
		</div>
	{/if}
</section>

<style>
	.additional-text-section {
		& > * + * {
			margin-top: var(--spacing-line-break);
		}
	}
</style>
