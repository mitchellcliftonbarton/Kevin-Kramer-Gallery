import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	return json({
		envCheck: {
			MAILCHIMP_API_SERVER: env.MAILCHIMP_API_SERVER ? 'SET' : 'MISSING',
			MAILCHIMP_AUDIENCE_ID: env.MAILCHIMP_AUDIENCE_ID ? 'SET' : 'MISSING',
			MAILCHIMP_API_KEY: env.MAILCHIMP_API_KEY ? 'SET' : 'MISSING'
		},
		allEnvVars: Object.keys(env).filter((key) => key.startsWith('MAILCHIMP'))
	});
}
