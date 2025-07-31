<script>
	import { globalState } from '$lib/state/state.svelte';
	import NewsletterForm from './NewsletterForm.svelte';

	const closeNewsletterPopup = () => {
		document.body.style.overflow = 'initial';
		globalState.newsletterPopupActive = false;
	};
</script>

<div id="newsletter-popup-bg" class="fixed top-0 left-0 h-full w-full"></div>

<div
	id="newsletter-popup"
	class="fixed top-0 left-0 flex h-full w-full items-center justify-center"
>
	<button class="closer fill-parent" onclick={closeNewsletterPopup}>
		<span class="sr-only">Close newsletter popup</span>

		<div class="fill-parent"></div>
	</button>

	<div
		class="modal bg-yellow lg:bg-green py-lg px-lg lg:px-xl flex flex-col items-center justify-center"
	>
		<p class="text-center">Mailing List</p>

		<NewsletterForm />
	</div>
</div>

<style>
	#newsletter-popup-bg {
		background-color: white;
		z-index: 100;
		mix-blend-mode: color;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;

		:global(#app.newsletter-popup-active &) {
			opacity: 1;
		}
	}

	#newsletter-popup {
		z-index: 200;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s;

		:global(#app.newsletter-popup-active &) {
			opacity: 1;
			pointer-events: auto;
		}
	}

	.closer {
		background-color: rgba(255, 255, 255, 0.5);
	}

	.modal {
		min-width: 400px;
		max-width: 900px;
		width: calc(100% - 14px);
		aspect-ratio: 3/4;
		z-index: 10;
		position: relative;

		@media (min-width: 1024px) {
			aspect-ratio: 4/3;
			width: 50%;
		}

		:global(.email-form) {
			margin-top: var(--spacing-lg);
			width: 100%;
		}

		:global(.email-form > * + *) {
			margin-top: var(--spacing-md);
		}

		:global(.email-form > * + .submit-container) {
			margin-top: 68px;
		}

		:global(.email-form .submit-container button[type='submit']:not(:disabled)) {
			&:hover {
				color: var(--color-white);
			}
		}
	}
</style>
