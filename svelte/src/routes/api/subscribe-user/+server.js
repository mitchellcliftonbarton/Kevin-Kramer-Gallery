import { json } from '@sveltejs/kit';
import mailchimp from '@mailchimp/mailchimp_marketing';
import md5 from 'md5';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	// get email from request
	const { firstName, lastName, email } = await request.json();

	// create hash for email
	const emailHash = md5(email.toLowerCase());

	// set mailchimp config
	mailchimp.setConfig({
		apiKey: env.MAILCHIMP_API_KEY,
		server: env.MAILCHIMP_API_SERVER
	});

	// make request to mailchimp
	const mcRequest = await mailchimp.lists.setListMember(env.MAILCHIMP_AUDIENCE_ID, emailHash, {
		email_address: email,
		status_if_new: 'pending', // we need to set the list to allow double opt in
		merge_fields: {
			FNAME: firstName,
			LNAME: lastName
		}
	});

	// return response
	if (mcRequest.id) {
		return json({ status: 'success', data: mcRequest });
	} else {
		return json({ status: 'error', data: mcRequest });
	}
}
