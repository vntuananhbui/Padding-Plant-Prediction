# Paddy Plant Analysis Service

This service provides a comprehensive analysis of paddy (rice) plants using machine learning models. It can predict:
- Plant disease and health status
- Plant variety
- Plant age in days

## Features

- Disease detection and health status classification
- Variety identification
- Age prediction
- GPU support for faster inference
- RESTful API endpoints for predictions

## Setup

### 1. Create and Activate Virtual Environment

#### For Windows:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate
```

#### For macOS/Linux:
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate
```

### 2. Install Dependencies
```bash
# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt
```

### 3. Model Files Setup
1. Create a `model` directory in your project root:
```bash
mkdir model
```

2. **IMPORTANT**: You need to manually add the following model files to the `model` directory:
   - task1_finetuned.keras (Disease detection model)
   - Task2_Variety_CNN_FineTune_Dropout.keras (Variety classification model)
   - task3_efficient_cnn_BEST.keras (Age prediction model)

   > Note: These model files are not included in the repository. You need to obtain them separately and place them in the `model` directory.

### 4. JSON Files Setup
Ensure you have the following JSON files in your project root:
- disease_classes.json
- variety_classes.json

## Running the Application

1. Make sure your virtual environment is activated
2. Run the application:
```bash
python view.py
```

The application should start and be accessible through your web browser.

## Usage

The service provides three main prediction functions:
- `predict_disease()`: Detects plant diseases and health status
- `predict_variety()`: Identifies the plant variety
- `predict_age()`: Predicts the plant's age in days

Each function accepts image data and returns predictions with confidence scores.

## Requirements

- Python 3.x
- TensorFlow
- GPU support (optional but recommended for faster inference)

## Troubleshooting

If you encounter any issues:

1. Ensure your virtual environment is activated
2. Verify all model files are in the correct location
3. Check if all JSON files are present
4. Make sure all dependencies are installed correctly
5. For GPU support, ensure you have compatible CUDA drivers installed
