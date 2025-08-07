<script>
	import EmailValidator from 'email-validator';

	//props
	let { title } = $props();

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let buttonText = $state('Subscribe');
	let submitted = $state(false);

	let allFieldsFilled = $derived(
		firstName !== '' && lastName !== '' && email !== '' && EmailValidator.validate(email)
	);

	// reset function
	const resetForm = () => {
		firstName = '';
		lastName = '';
		email = '';
		buttonText = 'Subscribe';
		submitted = false;
	};

	// handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		// check to make sure all fields are filled
		if (!allFieldsFilled) {
			alert('Please fill in all fields');
			return;
		}

		// check to make sure email is valid
		if (!EmailValidator.validate(email)) {
			alert('Please enter a valid email address');
			return;
		}

		// change button text
		buttonText = 'Submitting...';

		// send request to our api route
		const res = await fetch('/api/subscribe-user', {
			body: JSON.stringify({
				firstName,
				lastName,
				email
			}),

			headers: {
				'Content-Type': 'application/json'
			},

			method: 'POST'
		});

		// get response
		const subscribeConfirm = await res.json();

		// check if successful or not
		if (subscribeConfirm.status === 'success') {
			buttonText = 'Subscribed';
			submitted = true;

			// setTimeout(() => {
			// 	buttonText = 'Subscribe';
			// }, 1200);
		} else {
			console.error(subscribeConfirm.data);

			alert('There was an error subscribing to the newsletter.');

			resetForm();
		}
	};

	const handleFormClick = () => {
		if (submitted) {
			resetForm();
		}
	};
</script>

<form class="email-form" onsubmit={handleSubmit}>
	{#if title}
		<p class="text-center lg:hidden">{title}</p>
	{/if}

	<div class="main-fields">
		<div class="input-wrapper">
			<input
				type="text"
				placeholder="First Name"
				bind:value={firstName}
				onfocus={handleFormClick}
			/>
		</div>

		<div class="input-wrapper">
			<input type="text" placeholder="Last Name" bind:value={lastName} onfocus={handleFormClick} />
		</div>

		<div class="input-wrapper">
			<input
				type="email"
				placeholder="Email Address"
				bind:value={email}
				onfocus={handleFormClick}
			/>
		</div>
	</div>

	<div class="submit-container flex justify-center">
		<button type="submit" disabled={submitted || !allFieldsFilled}>{buttonText}</button>
	</div>
</form>

<style>
	.email-form {
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

		button[type='submit'] {
			opacity: 1;
			transition: opacity 0.3s;

			&:disabled {
				opacity: 0.3;
				cursor: not-allowed;
			}
		}
	}
</style>
