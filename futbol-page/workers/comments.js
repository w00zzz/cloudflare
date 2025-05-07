addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Simulación de base de datos en memoria
let comments = [
  {
    id: 1,
    user: "Juan Pérez",
    text: "¡El Real Madrid es el mejor equipo del mundo!",
    date: "2024-03-20"
  },
  {
    id: 2,
    user: "María García",
    text: "Messi es el GOAT, no hay discusión.",
    date: "2024-03-19"
  }
]

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

  // GET /api/comments
  if (request.method === 'GET' && url.pathname === '/api/comments') {
    return new Response(JSON.stringify(comments), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  // POST /api/comments
  if (request.method === 'POST' && url.pathname === '/api/comments') {
    const newComment = await request.json()
    newComment.id = comments.length + 1
    newComment.date = new Date().toISOString().split('T')[0]
    comments.unshift(newComment)

    return new Response(JSON.stringify(newComment), {
      status: 201,
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