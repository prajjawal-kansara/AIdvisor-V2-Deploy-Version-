const { discoverToolsByCategory } = require('../../lib/gemini');

export default async function handler(req, res) {
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

  try {
    const { category } = req.query;
    
    console.log('Discovering tools in category:', category);
    
    const categoryInfo = await discoverToolsByCategory(category);
    
    res.json({
      success: true,
      ...categoryInfo,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error discovering category tools:', error);
    res.status(500).json({ 
      error: 'Failed to discover category tools', 
      details: error.message 
    });
  }
}