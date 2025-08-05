const { discoverAndRecommendAITools } = require('../lib/gemini');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let userPrompt;
    
    if (req.method === 'POST') {
      ({ userPrompt } = req.body);
    } else {
      // GET request - get from query parameters
      userPrompt = req.query.userPrompt;
    }
    
    if (!userPrompt) {
      return res.status(400).json({ error: 'User prompt is required' });
    }

    console.log('Processing AI discovery request:', userPrompt);
    
    const startTime = Date.now();
    
    // Use Gemini to discover and recommend AI tools from the entire ecosystem
    const recommendations = await discoverAndRecommendAITools(userPrompt);
    
    const processingTime = Date.now() - startTime;
    
    res.json({
      success: true,
      query: userPrompt,
      ...recommendations,
      metadata: {
        processingTimeMs: processingTime,
        timestamp: new Date().toISOString(),
        totalRecommendations: recommendations.recommendations?.length || 0,
        aiPowered: true
      }
    });
    
  } catch (error) {
    console.error('Error in AI tool recommendation:', error);
    res.status(500).json({ 
      error: 'Failed to discover AI tools', 
      details: error.message,
      suggestion: 'Try rephrasing your request or check if Gemini API key is valid'
    });
  }
}