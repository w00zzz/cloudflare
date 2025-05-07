addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle OPTIONS request for CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  // API endpoints
  if (url.pathname === '/api/teams') {
    const teams = [
      {
        id: 1,
        name: "Real Madrid",
        country: "España",
        trophies: 14
      },
      {
        id: 2,
        name: "Manchester City",
        country: "Inglaterra",
        trophies: 1
      },
      {
        id: 3,
        name: "Bayern Munich",
        country: "Alemania",
        trophies: 6
      }
    ]

    return new Response(JSON.stringify(teams), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  // Default response for unknown endpoints
  return new Response('Not Found', {
    status: 404,
    headers: corsHeaders
  })
} 