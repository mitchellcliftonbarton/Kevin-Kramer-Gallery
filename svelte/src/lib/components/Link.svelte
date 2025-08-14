<script>
	const { portableText, children } = $props();

	const { href, pdf, blank } = portableText.value;

	// blank value
	let blankValue = $derived(pdf?.asset?.url ? true : blank);

	// link value
	let linkValue = $derived(pdf?.asset?.url || href);
</script>

{#if linkValue}
	<a href={linkValue} rel="noopener noreferrer" target={blankValue ? '_blank' : null}>
		{@render children()}
	</a>
{:else}
	<div>
		{@render children()}
	</div>
{/if}
