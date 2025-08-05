const { getDetailedToolInfo } = require('../../lib/gemini');

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
    const { toolName } = req.query;
    
    console.log('Getting detailed info for:', toolName);
    
    const toolInfo = await getDetailedToolInfo(toolName);
    
    res.json({
      success: true,
      tool: toolInfo,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error getting tool details:', error);
    res.status(500).json({ 
      error: 'Failed to get tool details', 
      details: error.message 
    });
  }
}