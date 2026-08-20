export default {
  async fetch(request, env, ctx) {
    // CORS для Epic Games
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok',
        timestamp: new Date().toISOString()
      }), {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        }
      });
    }

    // Главная страница
    if (url.pathname === '/') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>NVerse Games</title>
          <style>
            body { 
              font-family: Arial; 
              text-align: center; 
              padding: 50px;
              background: #1a1a2e;
              color: #e0e0e0;
            }
            h1 { color: #e94560; }
            .status { color: #4ecca3; }
          </style>
        </head>
        <body>
          <h1>🎮 NVerse Games</h1>
          <p class="status">✅ Server is running!</p>
          <p>API endpoint: <code>/api/health</code></p>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }
};
