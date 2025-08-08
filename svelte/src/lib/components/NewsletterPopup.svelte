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
		class="modal bg-yellow lg:bg-green lg:py-lg px-lg lg:px-xl flex flex-col items-center justify-center"
	>
		<p class="hidden text-center lg:block">Mailing List</p>

		<NewsletterForm title="Mailing List" />
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
		width: calc(100% - 28px);
		aspect-ratio: 3/4;
		z-index: 10;
		position: relative;
		height: auto;

		@media (min-width: 1024px) {
			width: 50%;
			min-width: 400px;
			max-width: 700px;
			aspect-ratio: 4/3;
		}

		:global(.email-form) {
			width: 100%;
			display: flex;
			flex-direction: column;
			height: 100%;
			justify-content: space-between;
			padding: var(--spacing-lg) 0;

			@media (min-width: 1024px) {
				margin-top: var(--spacing-lg);
				padding: 0;
				height: auto;
				justify-content: center;
			}
		}

		:global(.email-form .main-fields > * + *) {
			margin-top: var(--spacing-md);
		}

		:global(.email-form > * + .submit-container) {
			/* margin-top: 4rem; */

			@media (min-width: 1024px) {
				margin-top: 6.8rem;
			}
		}

		:global(.email-form .submit-container button[type='submit']:not(:disabled)) {
			/* @media (min-width: 1024px) {
				&:hover {
					color: var(--color-white);
				}
			} */

			&:hover {
				color: var(--color-white);
			}
		}
	}
</style>
