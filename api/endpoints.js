export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    res.json({
      success: true,
      endpoints: {
        'POST /api/recommend': 'Get AI tool recommendations based on natural language description',
        'GET /api/tools/[toolName]': 'Get detailed information about a specific AI tool',
        'GET /api/category/[category]': 'Discover tools in a specific category',
        'GET /api/insights': 'Get AI industry insights and trends',
        'POST /api/search': 'Search for AI tools with filters',
        'POST /api/compare': 'Compare multiple AI tools',
        'GET /api/health': 'Health check',
        'GET /api/endpoints': 'This endpoint - list all available endpoints'
      },
      description: 'Complete AI Tools Discovery Platform API'
    });
  }