import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class PaddyPredictionService:
    def __init__(self):
        try:
            # Set memory growth for GPU if available
            gpus = tf.config.list_physical_devices('GPU')
            if gpus:
                for gpu in gpus:
                    tf.config.experimental.set_memory_growth(gpu, True)
            
            # Load models
            logger.info("Loading models...")
            self.disease_model = tf.keras.models.load_model('./model/task1_finetuned.keras', compile=False)
            self.variety_model = tf.keras.models.load_model('./model/Task2_Variety_CNN_FineTune_Dropout.keras', compile=False)
            self.age_model = tf.keras.models.load_model('./model/task3_efficient_cnn_BEST.keras', compile=False)
            
            # Compile models
            self.disease_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
            self.variety_model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
            self.age_model.compile(optimizer='adam', loss='mse')
            
            # Load class mappings
            with open('disease_classes.json', 'r') as f:
                self.disease_classes = json.load(f)
            with open('variety_classes.json', 'r') as f:
                self.variety_classes = json.load(f)
            
            logger.info("All models loaded successfully")
            
        except Exception as e:
            logger.error(f"Error initializing models: {str(e)}")
            raise

    def preprocess_image(self, image_data):
        try:
            # Convert bytes to image
            img = Image.open(io.BytesIO(image_data))
            # Resize to match model input
            img = img.resize((224, 224))
            # Convert to array and normalize
            img_array = np.array(img) / 255.0
            # Add batch dimension
            return np.expand_dims(img_array, axis=0)
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise

    def predict_disease(self, image_data):
        try:
            # Preprocess the image
            processed_image = self.preprocess_image(image_data)
            # Make prediction
            prediction = self.disease_model.predict(processed_image, verbose=0)
            # Get the predicted class
            predicted_class = np.argmax(prediction[0])
            confidence = float(prediction[0][predicted_class])
            
            # Map prediction to class name
            disease_name = self.disease_classes[str(predicted_class)]
            
            return {
                "disease": disease_name,
                "confidence": confidence,
                "is_healthy": disease_name == "normal"
            }
        except Exception as e:
            logger.error(f"Error predicting disease: {str(e)}")
            raise

    def predict_variety(self, image_data):
        try:
            # Preprocess the image
            processed_image = self.preprocess_image(image_data)
            # Make prediction
            prediction = self.variety_model.predict(processed_image, verbose=0)
            # Get the predicted class
            predicted_class = np.argmax(prediction[0])
            confidence = float(prediction[0][predicted_class])
            
            # Map prediction to variety name
            variety_name = self.variety_classes[str(predicted_class)]
            
            return {
                "variety": variety_name,
                "confidence": confidence
            }
        except Exception as e:
            logger.error(f"Error predicting variety: {str(e)}")
            raise

    def predict_age(self, image_data):
        try:
            # Preprocess the image
            processed_image = self.preprocess_image(image_data)
            # Make prediction
            prediction = self.age_model.predict(processed_image, verbose=0)
            # Get the predicted age
            predicted_age = float(prediction[0][0])
            
            return {
                "age_days": predicted_age
            }
        except Exception as e:
            logger.error(f"Error predicting age: {str(e)}")
            raise
