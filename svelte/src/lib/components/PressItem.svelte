<script>
	import Portable from './Portable.svelte';

	import { format } from 'date-fns';
	let { press } = $props();

	const { article_title, author, source, date, link, pdf } = press;

	// check if article_title has a “ at beginning or ” at end. If it does, remove both
	let articleTitle = $derived(article_title?.replace(/^“/, '').replace(/”$/, ''));

	// link
	let linkValue = $derived(pdf ? pdf?.asset?.url : link);
</script>

<svelte:element
	this={linkValue ? 'a' : 'div'}
	href={linkValue}
	target={linkValue ? '_blank' : null}
>
	{#if article_title}
		<p class="title">{article_title}”</p>
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
</svelte:element>

<style>
	.title {
		position: relative;

		&::before {
			content: '“';
			position: absolute;
			left: -0.52em;
			top: 0;
		}
	}

	a {
		/* @media (min-width: 1024px) {
			&:hover {
				color: var(--color-blue);
			}
		} */

		&:hover {
			color: var(--color-blue);
		}
	}
</style>
