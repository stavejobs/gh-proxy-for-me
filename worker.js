// Cloudflare Workers GitHub Proxy Script with Domestic Mirror Support

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url);
    const githubApiUrl = `https://api.github.com${url.pathname}`;

    // Handle any domestic mirror
    if (url.hostname === 'your-domestic-mirror.com') {
        url.hostname = 'api.github.com'; // change to GitHub API endpoint
    }

    const modifiedRequest = new Request(githubApiUrl, {
        method: request.method,
        headers: {  
            'User-Agent': 'Cloudflare Workers GitHub Proxy',
            'Authorization': request.headers.get('Authorization'),
            'Accept': 'application/vnd.github.v3+json',
            // Include other headers as needed
        },
    });

    const response = await fetch(modifiedRequest);
    const responseBody = await response.text();

    return new Response(responseBody, {
        status: response.status,
        headers: {  
            'Content-Type': response.headers.get('Content-Type'),
            // Include any other headers you want to pass through
        },
    });
}