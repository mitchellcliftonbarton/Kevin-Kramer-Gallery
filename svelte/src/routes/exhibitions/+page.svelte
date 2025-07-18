<script>
	let { data } = $props();

	const { exhibitions } = data;
</script>

<h1>All Exhibitions</h1>

<ul class="mt-12 flex flex-col gap-4">
	{#each exhibitions as exhibition}
		<li>
			<a
				href={`/exhibitions/${exhibition.slug.current}`}
				class="block inline-block rounded-xl bg-slate-100 px-4 py-1 transition-colors duration-200 lg:hover:bg-slate-400 lg:hover:text-white"
			>
				{exhibition.title}
			</a>
		</li>
	{/each}
</ul>
