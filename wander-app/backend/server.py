import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Agent, Task, Crew, Process

load_dotenv()

app = FastAPI(
    title="UpStay API",
    description="API for UpStay application",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Request / Response Models
# --------------------------------------------------

class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    response: str


# --------------------------------------------------
# CrewAI Agent
# --------------------------------------------------

maya = Agent(
    role="UpStay AI Assistant",
    goal=(
        "Help UpStay users with their questions by providing "
        "clear, useful, and accurate answers."
    ),
    backstory=(
        "You are Maya, the AI assistant for UpStay. "
        "You help users understand the UpStay platform, "
        "answer questions, and guide them through their "
        "travel and accommodation needs."
    ),
    verbose=True,
    allow_delegation=False
)

# --------------------------------------------------
# Routes
# --------------------------------------------------

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the UpStay API!"
    }


@app.post("/ask/agent", response_model=AskResponse)
async def ask_agent(request: AskRequest):

    try:
        result = await maya.kickoff(request.question)
        return AskResponse(
            response=str(result)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Agent error: {str(e)}"
        )