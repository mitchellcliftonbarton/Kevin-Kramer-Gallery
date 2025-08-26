import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// This ensures environment variables work in both dev and production
			platformProxy: {
				enabled: true
			}
		})
	}
};

export default config;
