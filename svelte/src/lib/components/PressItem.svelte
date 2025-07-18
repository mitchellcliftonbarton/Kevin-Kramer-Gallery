<script>
	import { PortableText } from '@portabletext/svelte';

	import { format } from 'date-fns';
	let { press } = $props();

	const { article_title, author, source, date, link, text_override } = press;
</script>

<svelte:element this={link ? 'a' : 'div'} href={link} target={link ? '_blank' : null}>
	{#if text_override}
		<div class="rich-text">
			<PortableText value={text_override} />
		</div>
	{:else}
		{#if article_title}
			<p>“{article_title}”</p>
		{/if}

		{#if author}
			<p>{author}</p>
		{/if}

		{#if source}
			<p class="italic">{source}</p>
		{/if}

		{#if date}
			<p>{format(date, 'MMMM yyyy')}</p>
		{/if}
	{/if}
</svelte:element>

<style>
	a {
		&:hover {
			color: var(--color-blue);
		}
	}
</style>
