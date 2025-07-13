from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import TypedDict
from langgraph.graph import StateGraph
import openai
import os

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI (you'll need to set OPENAI_API_KEY environment variable)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define the state schema
class TripState(TypedDict, total=False):
    destination: str
    days: int
    interests: str
    itinerary: str
    budget: str
    travel_style: str

def collect_info(state: TripState) -> TripState:
    # Validate and enrich user input
    if not state.get("destination"):
        state["destination"] = "Unknown destination"
    if not state.get("days") or state["days"] < 1:
        state["days"] = 3
    if not state.get("interests"):
        state["interests"] = "general sightseeing"
    if not state.get("budget"):
        state["budget"] = "moderate"
    if not state.get("travel_style"):
        state["travel_style"] = "balanced"
    return state

def plan_trip_with_llm(state: TripState) -> TripState:
    """Agentic trip planner using OpenAI LLM"""
    
    # Create a detailed prompt for the LLM
    prompt = f"""
    You are an expert travel agent. Create a detailed, personalized {state['days']}-day itinerary for a trip to {state['destination']}.
    
    Traveler Preferences:
    - Interests: {state['interests']}
    - Budget: {state['budget']}
    - Travel Style: {state['travel_style']}
    - Duration: {state['days']} days
    
    Please provide:
    1. A day-by-day itinerary with specific activities, attractions, and restaurants
    2. Practical tips for each day (best times to visit, transportation, etc.)
    3. Estimated costs for major activities
    4. Local recommendations based on the traveler's interests
    
    Format the response as a detailed, well-structured itinerary that someone could follow.
    """
    
    try:
        # Call OpenAI API using the new client format
        from openai import OpenAI
        client = OpenAI(api_key=openai.api_key)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert travel agent with deep knowledge of destinations worldwide. Provide detailed, practical, and personalized travel itineraries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        itinerary = response.choices[0].message.content
        state["itinerary"] = itinerary
        print("OpenAI API call successful!")
        
    except Exception as e:
        print(f"OpenAI API Error: {e}")  # Debug: show the actual error
        # Fallback to a basic itinerary if LLM call fails
        state["itinerary"] = f"""
        Day 1: Arrive in {state['destination']}, explore local {state['interests']}.
        Day 2: Visit top attractions in {state['destination']}.
        Day 3: Enjoy local cuisine and relax.
        Trip planned for {state['days']} days.
        
        Note: LLM integration temporarily unavailable. This is a basic itinerary.
        """
    
    return state

# Build the LangGraph workflow
builder = StateGraph(TripState)
builder.add_node("collect_info", collect_info)
builder.add_node("plan_trip", plan_trip_with_llm)
builder.add_edge("collect_info", "plan_trip")
builder.set_entry_point("collect_info")
builder.set_finish_point("plan_trip")
compiled = builder.compile()

def run_trip_planner(data):
    result = compiled.invoke(data)
    return result

@app.post("/plan_trip")
async def plan_trip_endpoint(request: Request):
    data = await request.json()
    result = run_trip_planner(data)
    return {"itinerary": result.get("itinerary", "No itinerary generated.")}

@app.get("/")
async def root():
    return {"message": "Trip Planner Agent API - Use POST /plan_trip to plan your trip!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 