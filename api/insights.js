const { getAIIndustryInsights } = require('../lib/gemini');

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
    console.log('Getting AI industry insights...');
    
    const insights = await getAIIndustryInsights();
    
    res.json({
      success: true,
      insights,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error getting industry insights:', error);
    res.status(500).json({ 
      error: 'Failed to get industry insights', 
      details: error.message 
    });
  }
}