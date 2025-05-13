from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from service import PaddyPredictionService
import uvicorn
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Paddy Plant Analysis API",
    description="API for analyzing paddy plant images - disease classification, variety identification, and age prediction",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize the prediction service
prediction_service = PaddyPredictionService()

@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict if the paddy plant is healthy or diseased, and identify the specific disease if present.
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Get prediction
        result = prediction_service.predict_disease(contents)
        
        return {
            "status": "success",
            "result": result,
            "message": "Disease prediction completed successfully"
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/variety")
async def predict_variety(file: UploadFile = File(...)):
    """
    Identify the variety of the paddy plant from the image.
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Get prediction
        result = prediction_service.predict_variety(contents)
        
        return {
            "status": "success",
            "result": result,
            "message": "Variety prediction completed successfully"
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/age")
async def predict_age(file: UploadFile = File(...)):
    """
    Predict the age of the paddy plant in days.
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Get prediction
        result = prediction_service.predict_age(contents)
        
        return {
            "status": "success",
            "result": result,
            "message": "Age prediction completed successfully"
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
