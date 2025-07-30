<script>
	const { portableText, children } = $props();

	const { href, blank } = portableText.value;
</script>

{#if blank}
  <a 
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {@render children()}
  </a>
{:else}
  <a 
    href={href}
    rel="noopener noreferrer"
  >
    {@render children()}
  </a>
{/if}
