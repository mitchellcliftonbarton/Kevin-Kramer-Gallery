<script>
	import { PortableText } from '@portabletext/svelte';

	// define props
	let { data } = $props();

	// destructure the data
	const { newsletter_title, siteSettings } = data;

	// destructure site settings
	const { alert, address, hours, contactInformation, socialLinks } = siteSettings;
</script>

<div class="flex min-h-[100svh] flex-col">
	<div class="px-lg flex flex-1 items-center justify-center">
		<div class="gap-base grid w-full max-w-[800px] grid-cols-2 lg:w-1/2">
			{#if alert}
				<div class="alert text-green rich-text col-span-2">
					<PortableText value={alert} />
				</div>
			{/if}

			<div class="info col-span-1">
				<div class="rich-text">
					<PortableText value={address} />
				</div>

				<div class="rich-text">
					<PortableText value={hours} />
				</div>

				<div class="rich-text">
					<PortableText value={contactInformation} />
					{#each socialLinks as link}
						<a href={link.href} target={link.blank ? '_blank' : '_self'}>{link.linkText}</a>
					{/each}
				</div>
			</div>

			<div class="newsletter col-span-1">
				<h2>{newsletter_title ?? 'Mailing List'}</h2>

				<form class="email-form" action="">
					<div class="input-wrapper">
						<input type="text" placeholder="First Name" />
					</div>

					<div class="input-wrapper">
						<input type="text" placeholder="Last Name" />
					</div>

					<div class="input-wrapper">
						<input type="email" placeholder="Email Address" />
					</div>

					<div>
						<button type="submit">Subscribe</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="other-links p-lg flex justify-start gap-5 text-sm">
		<nav>
			<ul class="flex items-center gap-[0.2em]">
				<li>
					<a href="/accessibility">Accessibility</a><span>,</span>
				</li>
				<li>
					<a href="/privacy">Privacy</a><span>,</span>
				</li>
				<li>
					<a href="/terms">Terms & Conditions</a>
				</li>
			</ul>
		</nav>

		<p>Site Design: <a href="https://www.noahbeckwith.com/" target="_blank">Noah Beckwith</a></p>
		<p>Site Build: <a href="https://www.cold-rice.info/" target="_blank">Cold Rice LLC</a></p>
	</div>
</div>

<style>
	.other-links {
		a {
			&:hover {
				color: var(--color-blue);
			}
		}
	}

	.info {
		& > * + * {
			margin-top: var(--spacing-line-break);
		}
	}

	.newsletter {
		& > * + * {
			margin-top: var(--spacing-line-break);
		}

		.email-form {
			& > * + * {
				margin-top: var(--spacing-line-break);
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
