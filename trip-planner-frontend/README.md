# Trip Planner Frontend

## Setup

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Start the development server:
   ```bash
   npm start
   ```

The app will run at `http://localhost:3000` by default.

## Backend Connection
- The frontend expects the backend FastAPI server to be running at `http://127.0.0.1:8000`.
- You can change the backend URL in `src/App.js` if needed. 

## 🤖 **Real AI Agents Now Active**

### **Agent 1: CollectInfo Agent**
- **Validates and enriches** user input
- **Sets smart defaults** for missing fields
- **Ensures data quality** before LLM processing

### **Agent 2: PlanTrip Agent** 
- **Uses OpenAI GPT-3.5-turbo** for intelligent planning
- **Generates personalized itineraries** based on all preferences
- **Provides detailed recommendations** with practical tips
- **Includes cost estimates** and local insights

##  **What You Need to Do**

1. **Get an OpenAI API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an account and get an API key
   - Set it as an environment variable:
     ```bash
     export OPENAI_API_KEY="your-api-key-here"
     ```

2. **Start the Backend:**
   ```bash
   uvicorn main:app --reload
   ```

3. **Start the Frontend:**
   ```bash
   cd trip-planner-frontend
   npm start
   ```

## 🎯 **Try It Out**

Now when you enter trip details, the AI agent will:
- **Analyze your preferences** (destination, interests, budget, travel style)
- **Generate a detailed, personalized itinerary** using real LLM reasoning
- **Provide practical tips** and recommendations
- **Consider your budget and travel style** in the planning

**This is now a true agentic application!** The AI will create unique, intelligent itineraries based on your specific preferences, not just template responses.

Would you like me to help you set up the API key or test the agent? 