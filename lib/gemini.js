const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// AI Tool Discovery and Recommendation using Gemini
async function discoverAndRecommendAITools(userPrompt) {
  const prompt = `
    Act as an expert AI tools researcher and consultant. Based on this user request: "${userPrompt}"

    Please research and recommend the BEST AI tools available globally that can solve this problem. Consider tools from all major providers: OpenAI, Google, Microsoft, Meta, Anthropic, Stability AI, Midjourney, RunwayML, ElevenLabs, Jasper, Copy.ai, and other emerging AI companies.

    Return your response in this EXACT JSON format:
    {
      "userIntent": {
        "problem": "clear description of what user wants to solve",
        "category": "primary AI category needed",
        "useCase": "specific use case",
        "techLevel": "beginner/intermediate/advanced",
        "budget": "estimated budget range or free"
      },
      "recommendations": [
        {
          "name": "Tool Name",
          "vendor": "Company Name",
          "description": "Detailed description of what this tool does and why it's perfect for this use case",
          "categories": ["Primary Category", "Secondary Category"],
          "useCases": ["Specific Use Case 1", "Use Case 2", "Use Case 3"],
          "pricing": {
            "hasFreeTier": true/false,
            "startingPrice": number,
            "pricingModel": "subscription/pay-per-use/one-time",
            "freeCredits": "description of free offering"
          },
          "features": ["Key Feature 1", "Feature 2", "Feature 3", "Feature 4"],
          "pros": ["Major Advantage 1", "Advantage 2", "Advantage 3"],
          "cons": ["Limitation 1", "Limitation 2"],
          "matchScore": number (70-100),
          "reasoning": "Detailed explanation why this tool is perfect for their specific need",
          "bestFor": "What this tool excels at for their use case",
          "gettingStarted": "Step-by-step guide to get started",
          "apiAvailable": true/false,
          "rating": number (4.0-5.0),
          "reviewsCount": estimated_number,
          "responseTime": "typical response time",
          "website": "official website URL",
          "alternatives": ["Alternative Tool 1", "Alternative 2"]
        }
      ],
      "summary": "Comprehensive analysis of the AI landscape for this problem",
      "marketAnalysis": "Current state of AI tools in this category",
      "trendingTools": ["Tool gaining popularity", "Emerging solution"],
      "budgetBreakdown": "Detailed cost analysis and recommendations",
      "implementationStrategy": "Step-by-step plan to implement these AI solutions",
      "futureConsiderations": "What to watch for in this AI space"
    }

    Requirements:
    - Recommend 3-5 REAL, currently available AI tools
    - Include both well-known and emerging tools
    - Provide accurate, up-to-date information
    - Consider different budget levels (free, affordable, premium)
    - Include specific websites and getting started guides
    - Focus on tools that are actively maintained and have good user reviews
    - Consider the user's technical level and specific requirements

    BE COMPREHENSIVE and provide tools that actually exist and are currently available. Include pricing information, features, and real websites.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Gemini response:', text.substring(0, 500) + '...');
    
    // Clean and extract JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      // Validate and enhance the response
      if (parsedResponse.recommendations && Array.isArray(parsedResponse.recommendations)) {
        return parsedResponse;
      }
    }
    
    throw new Error('Invalid JSON structure received');
    
  } catch (error) {
    console.error('Error in AI tool discovery:', error);
    throw error;
  }
}

// Get detailed information about a specific AI tool
async function getDetailedToolInfo(toolName) {
  const prompt = `
    Provide comprehensive, up-to-date information about the AI tool: "${toolName}"

    Return detailed information in this JSON format:
    {
      "name": "Official tool name",
      "vendor": "Company name",
      "description": "Detailed description of capabilities",
      "categories": ["Category 1", "Category 2"],
      "useCases": ["Use case 1", "Use case 2", "Use case 3"],
      "pricing": {
        "hasFreeTier": true/false,
        "plans": [
          {
            "name": "Plan name",
            "price": number,
            "features": ["feature 1", "feature 2"],
            "limits": "usage limits"
          }
        ]
      },
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "pros": ["Advantage 1", "Advantage 2"],
      "cons": ["Limitation 1", "Limitation 2"],
      "technicalDetails": {
        "apiAvailable": true/false,
        "integrations": ["Platform 1", "Platform 2"],
        "supportedFormats": ["Format 1", "Format 2"]
      },
      "userReviews": {
        "rating": number,
        "reviewCount": number,
        "commonPraise": ["What users love"],
        "commonComplaints": ["Common issues"]
      },
      "gettingStarted": {
        "steps": ["Step 1", "Step 2", "Step 3"],
        "timeToFirstResult": "estimated time",
        "learningCurve": "beginner/intermediate/advanced"
      },
      "website": "official website",
      "documentation": "documentation URL",
      "community": "community/support channels",
      "lastUpdated": "recent update info",
      "alternatives": ["Alternative 1", "Alternative 2"]
    }

    Provide REAL, accurate, current information only.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse tool information');
    
  } catch (error) {
    console.error('Error getting tool details:', error);
    throw error;
  }
}

// Discover AI tools by category
async function discoverToolsByCategory(category) {
  const prompt = `
    Research and list the top AI tools in the "${category}" category. Include both popular and emerging tools.

    Return in this JSON format:
    {
      "category": "${category}",
      "overview": "Brief overview of this AI category",
      "marketSize": "Information about market size and growth",
      "tools": [
        {
          "name": "Tool Name",
          "vendor": "Company",
          "description": "Brief description",
          "pricing": "Pricing info",
          "popularity": "High/Medium/Low",
          "website": "URL",
          "keyFeatures": ["Feature 1", "Feature 2"]
        }
      ],
      "trends": "Current trends in this category",
      "futureOutlook": "Where this category is heading"
    }

    Include 5-10 real tools that are currently available.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse category information');
    
  } catch (error) {
    console.error('Error discovering category tools:', error);
    throw error;
  }
}

// Get AI industry trends and insights
async function getAIIndustryInsights() {
  const prompt = `
    Provide current insights about the AI tools industry, trends, and market analysis.

    Return in this JSON format:
    {
      "marketOverview": {
        "totalTools": "estimated number",
        "marketValue": "current market size",
        "growthRate": "annual growth rate",
        "keyPlayers": ["Company 1", "Company 2", "Company 3"]
      },
      "trendingCategories": [
        {
          "category": "Category name",
          "growth": "growth percentage",
          "description": "why it's trending",
          "examples": ["Tool 1", "Tool 2"]
        }
      ],
      "emergingTools": [
        {
          "name": "Tool name",
          "category": "Category",
          "whyTrending": "Reason for popularity",
          "potential": "Future potential"
        }
      ],
      "investmentTrends": "Where money is flowing",
      "userAdoptionTrends": "How users are adopting AI",
      "futureOutlook": "Predictions for next 12 months",
      "recommendations": "What to watch for"
    }

    Provide current, accurate market intelligence.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse industry insights');
    
  } catch (error) {
    console.error('Error getting industry insights:', error);
    throw error;
  }
}

module.exports = {
  discoverAndRecommendAITools,
  getDetailedToolInfo,
  discoverToolsByCategory,
  getAIIndustryInsights,
  model
};