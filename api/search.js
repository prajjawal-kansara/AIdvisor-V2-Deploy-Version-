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
    let query, filters;
    
    if (req.method === 'POST') {
      ({ query, filters } = req.body);
    } else {
      // GET request - get from query parameters
      query = req.query.query;
      filters = req.query.filters ? JSON.parse(req.query.filters) : null;
    }
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    console.log('Searching AI tools for:', query);
    
    let searchPrompt = `Search for AI tools related to: "${query}"`;
    
    if (filters) {
      if (filters.budget) searchPrompt += ` Budget: ${filters.budget}`;
      if (filters.category) searchPrompt += ` Category: ${filters.category}`;
      if (filters.techLevel) searchPrompt += ` Technical Level: ${filters.techLevel}`;
    }
    
    const results = await discoverAndRecommendAITools(searchPrompt);
    
    res.json({
      success: true,
      query,
      filters,
      ...results,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in AI tools search:', error);
    res.status(500).json({ 
      error: 'Failed to search AI tools', 
      details: error.message 
    });
  }
}