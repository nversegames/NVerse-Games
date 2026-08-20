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

    // Health check для API
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        game: 'NVerse Games'
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
            .telegram-link {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background: #0088cc;
              color: white;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
            }
            .telegram-link:hover {
              background: #006699;
            }
            code {
              background: #2a2a3e;
              padding: 3px 8px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>🎮 NVerse Games</h1>
          <p class="status">✅ Server is running!</p>
          <p>API endpoint: <code>/api/health</code></p>
          
          <br>
          <a href="https://t.me/NVerseCompany" class="telegram-link">
            📱 Наши проекты можно скачать в Telegram
          </a>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Если ничего не найдено
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders 
      }
    });
  }
};
