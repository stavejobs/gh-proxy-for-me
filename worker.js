// Cloudflare Workers GitHub Proxy Script with Domestic Mirror Support

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Set up domestic mirror sources
  const mirrors = [
    'https://mirror1.example.com',
    'https://mirror2.example.com'
  ];

  // Build the mirror URL
  const targetUrl = `${mirrors[Math.floor(Math.random() * mirrors.length)]}${url.pathname}`;

  const options = {
    method: request.method,
    headers: {
      ...request.headers,
      'Origin': url.origin, // Set the Origin header for CORS
      'Access-Control-Allow-Origin': '*', // Allow all CORS origins
    },
  };

  // Forward the request to the mirror
  const response = await fetch(targetUrl, options);

  // Modify the response if necessary
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*'); // Allow all CORS origins

  return newResponse;
}