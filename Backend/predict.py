import os
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import json

def load_models():
    # Load the three models
    label_model = load_model('model/task1_finetuned_best.keras')
    variety_model = load_model('model/Task2_Variety_CNN_FineTune_Dropout.keras')
    age_model = load_model('model/task3_efficient_cnn_BEST.keras')
    return label_model, variety_model, age_model

def load_class_mappings():
    # Load class mappings from JSON files
    with open('disease_classes.json', 'r') as f:
        label_classes = json.load(f)
    with open('variety_classes.json', 'r') as f:
        variety_classes = json.load(f)
    return label_classes, variety_classes

def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize
    return img_array

def predict_and_update_csv(image_folder_path):
    # Load models and class mappings
    label_model, variety_model, age_model = load_models()
    label_classes, variety_classes = load_class_mappings()
    
    # Read the CSV file
    df = pd.read_csv('prediction_submission.csv')
    
    # Process each image
    for index, row in df.iterrows():
        image_id = row['image_id']
        image_path = os.path.join(image_folder_path, image_id)
        
        if os.path.exists(image_path):
            # Preprocess image
            img_array = preprocess_image(image_path)
            
            # Make predictions
            label_pred = label_model.predict(img_array)
            variety_pred = variety_model.predict(img_array)
            age_pred = age_model.predict(img_array)
            
            # Get predicted classes
            label_idx = np.argmax(label_pred[0])
            variety_idx = np.argmax(variety_pred[0])
            
            # Update DataFrame
            df.at[index, 'label'] = label_classes[str(label_idx)]
            df.at[index, 'variety'] = variety_classes[str(variety_idx)]
            df.at[index, 'age'] = float(age_pred[0][0])
    
    # Save updated CSV
    df.to_csv('prediction_submission.csv', index=False)
    print("Predictions completed and saved to prediction_submission.csv")

if __name__ == "__main__":
    # Replace this with your image folder path
    image_folder_path = "/Users/macintosh/TA-DOCUMENT/StudyZone/RMIT/2025/Sem_1_2025/MachineLearning/asm2-be/test_images"
    predict_and_update_csv(image_folder_path) 