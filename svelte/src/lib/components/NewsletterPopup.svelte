<script>
	import { globalState } from '$lib/state/state.svelte';

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

	<div class="modal bg-green py-lg px-xl">
		<p class="text-center">Mailing List</p>

		<form class="email-form mt-lg" action="">
			<div class="input-wrapper">
				<input type="text" placeholder="First Name" />
			</div>

			<div class="input-wrapper">
				<input type="text" placeholder="Last Name" />
			</div>

			<div class="input-wrapper">
				<input type="email" placeholder="Email Address" />
			</div>

			<div class="submit-container flex justify-center">
				<button type="submit">Subscribe</button>
			</div>
		</form>
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
		min-width: 500px;
		max-width: 900px;
		width: 50%;
		z-index: 10;
		position: relative;

		.email-form {
			& > * + * {
				margin-top: var(--spacing-md);
			}

			& > * + .submit-container {
				margin-top: 68px;
			}

			.input-wrapper {
				position: relative;

				&::after {
					content: '';
					position: absolute;
					bottom: -0.18em;
					left: 0;
					width: 100%;
					height: 1px;
					background-color: var(--color-black);
				}

				input {
					width: 100%;

					&::placeholder {
						color: var(--color-black);
					}
				}
			}

			button {
				opacity: 0.5;

				&:hover {
					color: var(--color-blue);
					opacity: 1;
				}
			}
		}
	}
</style>
