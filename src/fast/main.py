# main.py
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import uvicorn

app = FastAPI(title="Movie Poster API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class MovieRequest(BaseModel):
    movie_name: str

class MovieResponse(BaseModel):
    poster_url: str

class ErrorResponse(BaseModel):
    error: str

def get_movie_poster(movie_name: str) -> str | None:
    """Scrape IMDB for movie poster URL"""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
    }
    
    search_url = f"https://www.imdb.com/find/?q={movie_name.replace(' ', '+')}"
    
    try:
        # Get search results
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find movie results
        search_results = soup.select("li.ipc-metadata-list-summary-item")
        if not search_results:
            return None
        
        # Get first result link
        first_result = search_results[0]
        link_element = first_result.select_one("a.ipc-metadata-list-summary-item__t")
        if not link_element:
            return None
        
        link = link_element.get('href')
        movie_url = f"https://www.imdb.com{link}"
        
        # Get movie page
        movie_page = requests.get(movie_url, headers=headers)
        movie_page.raise_for_status()
        
        movie_soup = BeautifulSoup(movie_page.text, 'html.parser')
        
        # Find poster image
        poster_element = movie_soup.select_one("img.ipc-image")
        if not poster_element:
            return None
            
        poster_url = poster_element.get('src')
        return poster_url
        
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None

@app.get("/")
async def root():
    return {"message": "Movie Poster API is running!"}

@app.api_route("/get-movie-poster", methods=["POST", "OPTIONS"])
async def handle_movie_poster(request: Request):
    """Handle both OPTIONS (preflight) and POST requests"""
    
    # Handle preflight request
    if request.method == "OPTIONS":
        return JSONResponse(
            content={"message": "OK"},
            headers={
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "*",
            }
        )
    
    # Handle POST request
    try:
        body = await request.json()
        movie_name = body.get("movie_name")
        
        if not movie_name or not movie_name.strip():
            raise HTTPException(status_code=400, detail="Movie name cannot be empty")
        
        poster_url = get_movie_poster(movie_name)
        
        if not poster_url:
            raise HTTPException(status_code=404, detail="Movie poster not found")
        
        return {"poster_url": poster_url}
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)