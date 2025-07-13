# WanderWise - AI-Powered Travel Planner

A modern travel planning application that uses AI to create personalized itineraries for your dream trips.

## Features

- 🤖 **AI-Powered Planning**: Uses OpenAI GPT to generate detailed itineraries
- 🎯 **Personalized Recommendations**: Tailored to your interests, budget, and travel style
- 📱 **Modern UI**: Beautiful, responsive design that works on all devices
- ⚡ **Instant Results**: Get your itinerary in seconds
- 💰 **Budget Optimization**: Recommendations based on your budget level

## Tech Stack

### Frontend
- React.js
- Modern CSS with gradients and animations
- Responsive design

### Backend
- FastAPI (Python)
- LangGraph for workflow management
- OpenAI API integration

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- OpenAI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wanderwise
   ```

2. **Set up the backend**
   ```bash
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Set your OpenAI API key
   export OPENAI_API_KEY="your-api-key-here"
   
   # Run the backend
   python main.py
   ```

3. **Set up the frontend**
   ```bash
   cd trip-planner-frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

### Backend Deployment (Railway)

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
4. Deploy

### Alternative Backend Options

- **Render**: Free tier available
- **Heroku**: Paid service
- **DigitalOcean App Platform**: Simple deployment

## Environment Variables

### Backend
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Frontend
- `REACT_APP_API_URL`: Backend API URL (optional, defaults to localhost:8000)

## API Endpoints

- `GET /`: Health check
- `POST /plan_trip`: Generate itinerary
  ```json
  {
    "destination": "Paris",
    "days": 3,
    "interests": "culture, food",
    "budget": "moderate",
    "travel_style": "balanced"
  }
  ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details 