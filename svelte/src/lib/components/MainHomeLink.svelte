<script>
	import { page } from '$app/state';

	// get current path
	let currentPath = $derived(page.url.pathname);

	// set main link url
	let mainLinkUrl = $derived(currentPath === '/' ? '/information' : '/');

	// set hover text
	let mainLinkTextOverride = $state(null);
	let mainLinkText = $derived(
		mainLinkTextOverride || (currentPath === '/' ? 'Kevin Kramer Gallery' : 'Information')
	);

	// function to handle main link hover
	function handleMainLinkEnter() {
		if (currentPath === '/') {
			mainLinkTextOverride = 'Information';
		}
	}

	// function to handle main link hover
	function handleMainLinkLeave() {
		if (currentPath === '/') {
			mainLinkTextOverride = null;
		}
	}
</script>

<a
	href={mainLinkUrl}
	onmouseenter={handleMainLinkEnter}
	onmouseleave={handleMainLinkLeave}
	class="text-blue w-[200px] text-center"
>
	{mainLinkText}
</a>
