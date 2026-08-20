export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        game: 'NVerse Games'
      }), {
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          ...corsHeaders 
        }
      });
    }

    if (url.pathname === '/') {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>NVerse Games</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body { 
              font-family: 'Arial', sans-serif;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
              position: relative;
              overflow: hidden;
            }

            body::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(233,69,96,0.1) 0%, transparent 50%);
              animation: rotate 20s linear infinite;
            }

            @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .container {
              text-align: center;
              z-index: 1;
              padding: 40px;
            }

            .logo {
              width: 150px;
              height: 150px;
              margin: 0 auto 30px;
              border-radius: 30px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(233,69,96,0.3);
              animation: float 3s ease-in-out infinite;
              background: white;
            }

            .logo img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }

            h1 { 
              font-size: 48px;
              color: #ffffff;
              margin-bottom: 15px;
              text-shadow: 0 0 30px rgba(233,69,96,0.5);
            }

            .tagline {
              font-size: 18px;
              color: #a0a0b8;
              margin-bottom: 40px;
            }

            .telegram-link {
              display: inline-block;
              padding: 15px 40px;
              background: linear-gradient(135deg, #0088cc 0%, #005580 100%);
              color: white;
              text-decoration: none;
              border-radius: 50px;
              font-size: 18px;
              font-weight: bold;
              transition: all 0.3s ease;
              box-shadow: 0 5px 20px rgba(0,136,204,0.3);
            }

            .telegram-link:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 30px rgba(0,136,204,0.5);
            }

            .footer {
              margin-top: 40px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="https://raw.githubusercontent.com/nversegames/NVerse-Games/main/NVerseGamesLogo.png" alt="NVerse Games Logo">
            </div>
            <h1>NVerse Games</h1>
            <p class="tagline">Создаём игры будущего</p>
            
            <a href="https://t.me/NVerseCompany" class="telegram-link">
              📱 Наши проекты в Telegram
            </a>
            
            <p class="footer">© 2026 NVerse Games. Все права защищены.</p>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        ...corsHeaders 
      }
    });
  }
};
