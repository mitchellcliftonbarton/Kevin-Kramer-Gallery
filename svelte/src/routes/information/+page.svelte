<script>
	import Portable from '$lib/components/Portable.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';

	// define props
	let { data } = $props();

	// destructure the data
	const { newsletter_title, siteSettings } = data;

	// destructure site settings
	const { alert, address, hours, email, contactInformation, socialLinks } = siteSettings;
</script>

<svelte:head>
	<title>Information | Kevin Kramer Gallery</title>
	<meta property="og:title" content="Information | Kevin Kramer Gallery" />
</svelte:head>

<div class="pt-xxl flex min-h-[100svh] flex-col justify-between lg:pt-0">
	<div class="px-base-mid lg:px-lg flex flex-1 items-center justify-center">
		<div class="gap-lg lg:gap-base max-w-def-max grid w-full grid-cols-2 lg:w-1/2">
			{#if alert}
				<div class="alert text-green rich-text col-span-2 hidden lg:block">
					<Portable value={alert} />
				</div>
			{/if}

			<div class="info col-span-2 lg:col-span-1">
				{#if alert}
					<div class="alert text-green rich-text lg:hidden">
						<Portable value={alert} />
					</div>
				{/if}

				{#if address}
					<div class="rich-text">
						<Portable value={address} />
					</div>
				{/if}

				{#if hours}
					<div class="rich-text">
						<Portable value={hours} />
					</div>
				{/if}

				<div class="rich-text">
					{#if email}
						<CopyButton textToCopy={email} buttonText="Email" className="lg:hover:text-blue" />
					{/if}

					{#if contactInformation}
						<Portable value={contactInformation} />
					{/if}

					{#each socialLinks as link}
						<a href={link.href} target={link.blank ? '_blank' : '_self'}>{link.linkText}</a>
					{/each}
				</div>
			</div>

			<div class="newsletter col-span-2 lg:col-span-1">
				<h2>{newsletter_title ?? 'Mailing List'}</h2>

				<NewsletterForm />
			</div>
		</div>
	</div>

	<div class="other-links px-base-mid pb-base-mid pt-xl lg:p-lg flex justify-start gap-5 text-sm">
		<nav class="flex-1 lg:flex-none">
			<ul class="flex flex-col items-start lg:flex-row lg:items-center lg:gap-[0.2em]">
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

		<div class="flex flex-1 flex-col items-start lg:flex-none lg:flex-row lg:items-center lg:gap-5">
			<p>
				Site Design: <br class="lg:hidden" /><a href="https://www.noahbeckwith.com/" target="_blank"
					>Noah Beckwith</a
				>
			</p>
			<br class="lg:hidden" />
			<p>
				Site Build: <br class="lg:hidden" /><a href="https://www.cold-rice.info/" target="_blank"
					>Cold Rice LLC</a
				>
			</p>
		</div>
	</div>
</div>

<style>
	.other-links {
		a {
			@media (min-width: 1024px) {
				&:hover {
					color: var(--color-blue);
				}
			}
		}
	}

	.info {
		& > * + * {
			margin-top: var(--spacing-line-break);
		}
	}

	.newsletter {
		:global(& > * + *),
		:global(.email-form .main-fields > * + *),
		:global(.email-form > * + *) {
			margin-top: var(--spacing-line-break);
		}

		:global(.email-form .submit-container) {
			justify-content: flex-start;
		}

		:global(.email-form .submit-container button[type='submit']:not(:disabled)) {
			@media (min-width: 1024px) {
				&:hover {
					color: var(--color-blue);
				}
			}
		}
	}
</style>
