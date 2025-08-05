# AI Tool Discovery Platform

A powerful AI-powered platform for discovering and recommending the best AI tools available globally. Built with Node.js, Express, and powered by Google's Gemini AI.

## 🚀 Live Demo

**Production URL**: https://ai-recommender-v2-3kk0b9htr-prajjawal-kansaras-projects.vercel.app

## ✨ Features

- 🤖 **AI-Powered Recommendations**: Uses Gemini AI to provide intelligent tool recommendations
- 🔍 **Smart Search**: Search for AI tools by category, budget, and technical level
- 📊 **Detailed Insights**: Get comprehensive information about each AI tool
- 🎯 **Category Discovery**: Browse tools by specific categories
- 💡 **Industry Trends**: Stay updated with AI industry insights and trends
- 🌐 **Modern UI**: Beautiful React-based interface with Tailwind CSS
- 🔌 **RESTful API**: Complete API for integrations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **AI**: Google Gemini AI
- **Frontend**: React, Tailwind CSS
- **Deployment**: Vercel
- **APIs**: RESTful API endpoints

## 📦 Installation

### Prerequisites

- Node.js >= 18.0.0
- Google AI Studio API Key

### Endpoints

#### 1. Health Check
**GET** `/api/health`

Returns the health status of the API.

**Response:**
```json
{
  "success": true,
  "message": "AI Tools Discovery Platform",
  "timestamp": "2025-08-05T12:57:14.012Z",
  "version": "3.0.0"
}
```

#### 2. Search AI Tools
**GET** `/api/search?query=<search_term>&filters=<json_filters>`

**POST** `/api/search`

Search for AI tools based on your query.

**GET Parameters:**
- `query` (required): Search term
- `filters` (optional): JSON string of filters

**POST Body:**
```json
{
  "query": "image generation tools",
  "filters": {
    "budget": "free",
    "category": "image generation",
    "techLevel": "beginner"
  }
}
```

**Response:**
```json
{
  "success": true,
  "query": "image generation tools",
  "recommendations": [...],
  "timestamp": "2025-08-05T12:57:14.012Z"
}
```

#### 3. Get AI Recommendations
**GET** `/api/recommend?userPrompt=<your_prompt>`

**POST** `/api/recommend`

Get AI-powered recommendations for your specific use case.

**GET Parameters:**
- `userPrompt` (required): Your specific requirement

**POST Body:**
```json
{
  "userPrompt": "I need tools for creating marketing content"
}
```

**Response:**
```json
{
  "success": true,
  "query": "I need tools for creating marketing content",
  "recommendations": [...],
  "metadata": {
    "processingTimeMs": 2500,
    "timestamp": "2025-08-05T12:57:14.012Z",
    "totalRecommendations": 5,
    "aiPowered": true
  }
}
```

#### 4. Category Discovery
**GET** `/api/category/category1`

Discover AI tools by category.

#### 5. Tool Comparison
**GET** `/api/compare`

Compare different AI tools.

#### 6. Industry Insights
**GET** `/api/insights`

Get AI industry trends and insights.

#### 7. Available Endpoints
**GET** `/api/endpoints`

List all available API endpoints.

## 🧪 Testing Examples

### Test Search (GET)
```
https://your-domain.vercel.app/api/search?query=image generation tools
```

### Test Recommend (GET)
```
https://your-domain.vercel.app/api/recommend?userPrompt=I need tools for creating marketing content
```

### Test with cURL (POST)
```bash
# Search
curl -X POST https://your-domain.vercel.app/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "image generation tools", "filters": {"budget": "free"}}'

# Recommend
curl -X POST https://your-domain.vercel.app/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"userPrompt": "I need tools for creating marketing content"}'
```

## 🏗️ Project Structure

```
ai-recommender-V2/
├── api/                    # API endpoints
│   ├── category/          # Category-specific endpoints
│   ├── tools/             # Tool-specific endpoints
│   ├── health.js          # Health check endpoint
│   ├── search.js          # Search functionality
│   ├── recommend.js       # AI recommendations
│   ├── compare.js         # Tool comparison
│   ├── insights.js        # Industry insights
│   └── endpoints.js       # Available endpoints
├── lib/                   # Library files
│   └── gemini.js         # Gemini AI integration
├── public/               # Static frontend files
│   ├── assets/           # Images and assets
│   └── index.html        # Main frontend
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel configuration
└── README.md            # This file
```

## 🚨 Troubleshooting

### Common Issues

1. **"Method not allowed" error**
   - Make sure you're using GET or POST requests
   - Check the endpoint URL

2. **"Failed to discover AI tools" error**
   - Verify your `GEMINI_API_KEY` is set in Vercel
   - Check if the API key is valid

3. **CORS errors**
   - The API includes CORS headers for all origins
   - If issues persist, check your browser's CORS settings

### Environment Variables

Make sure these are set in your Vercel dashboard:
- `GEMINI_API_KEY`: Your Google AI Studio API key

---
