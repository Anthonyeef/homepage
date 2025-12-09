async function proxyRequest({ request, url }) {
	const targetUrl = `https://coffee-2025.vercel.app/coffee-2025${url.search}`;
	
	try {
		const headers = new Headers();
		// Copy relevant headers, excluding host
		for (const [key, value] of request.headers.entries()) {
			if (key.toLowerCase() !== 'host') {
				headers.set(key, value);
			}
		}
		
		const body = request.method !== 'GET' && request.method !== 'HEAD' 
			? await request.text() 
			: undefined;

		const response = await fetch(targetUrl, {
			method: request.method,
			headers,
			body,
		});

		const responseHeaders = new Headers();
		// Copy response headers, but adjust content-type if needed
		for (const [key, value] of response.headers.entries()) {
			responseHeaders.set(key, value);
		}

		const responseBody = await response.text();
		
		return new Response(responseBody, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	} catch (error) {
		console.error('Proxy error:', error);
		return new Response('Proxy error', { status: 502 });
	}
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
export const HEAD = proxyRequest;

