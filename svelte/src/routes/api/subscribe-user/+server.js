import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import md5 from 'md5';

export async function POST({ request }) {
	try {
		// get email from request
		const { firstName, lastName, email } = await request.json();

		console.log('Received request data:', { firstName, lastName, email });

		if (!email) {
			return json({ status: 'error', message: 'Email is required' }, { status: 400 });
		}

		// create hash for email
		const emailHash = md5(email.toLowerCase());

		// Mailchimp API endpoint
		const server = env.MAILCHIMP_API_SERVER;
		const audienceId = env.MAILCHIMP_AUDIENCE_ID;
		const apiKey = env.MAILCHIMP_API_KEY;

		// Debug logging (remove in production)
		console.log('Environment variables check:', {
			server: server ? 'SET' : 'MISSING',
			audienceId: audienceId ? 'SET' : 'MISSING',
			apiKey: apiKey ? 'SET' : 'MISSING'
		});

		if (!server || !audienceId || !apiKey) {
			console.error('Missing Mailchimp environment variables:', {
				server: server || 'undefined',
				audienceId: audienceId || 'undefined',
				apiKey: apiKey ? '***' : 'undefined'
			});
			return json(
				{
					status: 'error',
					message: 'Server configuration error - missing environment variables',
					debug: {
						server: !!server,
						audienceId: !!audienceId,
						apiKey: !!apiKey
					}
				},
				{ status: 500 }
			);
		}

		// Make direct HTTP request to Mailchimp API
		const mailchimpUrl = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members/${emailHash}`;
		console.log('Making request to Mailchimp:', mailchimpUrl);

		const requestBody = {
			email_address: email,
			status_if_new: 'pending',
			merge_fields: {
				FNAME: firstName || '',
				LNAME: lastName || ''
			}
		};

		console.log('Request body:', JSON.stringify(requestBody, null, 2));
		console.log('Authorization header:', `Basic ${btoa(`anystring:${apiKey}`)}`);

		const response = await fetch(mailchimpUrl, {
			method: 'PUT',
			headers: {
				Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		console.log('Response status:', response.status);
		console.log('Response headers:', Object.fromEntries(response.headers.entries()));

		const data = await response.json();
		console.log('Response data:', data);

		if (response.ok) {
			return json({ status: 'success', data });
		} else {
			console.error('Mailchimp API error:', data);
			return json({ status: 'error', data }, { status: response.status });
		}
	} catch (error) {
		console.error('API route error:', error);
		console.error('Error stack:', error.stack);
		return json(
			{
				status: 'error',
				message: 'Internal server error',
				error: error.message
			},
			{ status: 500 }
		);
	}
}
