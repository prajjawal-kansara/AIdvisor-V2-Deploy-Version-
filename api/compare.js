const { model } = require('../lib/gemini');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tools } = req.body;
    
    if (!tools || !Array.isArray(tools) || tools.length < 2) {
      return res.status(400).json({ error: 'At least 2 tools required for comparison' });
    }

    const toolsList = tools.join(', ');
    const prompt = `
      Compare these AI tools in detail: ${toolsList}
      
      Provide a comprehensive comparison in this JSON format:
      {
        "comparison": {
          "tools": ["${tools.join('", "')}"],
          "categories": "Common categories they serve",
          "overview": "Brief comparison overview"
        },
        "detailedComparison": [
          {
            "aspect": "Pricing",
            "analysis": {
              ${tools.map(tool => `"${tool}": "pricing analysis"`).join(',\n              ')}
            }
          },
          {
            "aspect": "Features",
            "analysis": {
              ${tools.map(tool => `"${tool}": "feature analysis"`).join(',\n              ')}
            }
          },
          {
            "aspect": "Ease of Use",
            "analysis": {
              ${tools.map(tool => `"${tool}": "usability analysis"`).join(',\n              ')}
            }
          },
          {
            "aspect": "Performance",
            "analysis": {
              ${tools.map(tool => `"${tool}": "performance analysis"`).join(',\n              ')}
            }
          }
        ],
        "recommendations": {
          "bestFor": {
            ${tools.map(tool => `"${tool}": "what this tool is best for"`).join(',\n            ')}
          },
          "winner": "Overall recommendation with reasoning"
        },
        "summary": "Detailed comparison summary and final recommendations"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const comparisonData = JSON.parse(jsonMatch[0]);
      
      res.json({
        success: true,
        ...comparisonData,
        timestamp: new Date().toISOString()
      });
    } else {
      throw new Error('Could not parse comparison data');
    }
    
  } catch (error) {
    console.error('Error comparing tools:', error);
    res.status(500).json({ 
      error: 'Failed to compare tools', 
      details: error.message 
    });
  }
}