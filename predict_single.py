import os
import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import json

def predict_func(task, model_path, folder_path, csv_path):
    """
    Predict and update CSV for a specific task with flexible paths
    
    Args:
        task (str): One of 'label', 'variety', or 'age'
        model_path (str): Path to the model file
        folder_path (str): Path to the folder containing test images
        csv_path (str): Path to the CSV file to update
    """
    # Validate task
    if task not in ['label', 'variety', 'age']:
        raise ValueError("Invalid task. Choose from: 'label', 'variety', 'age'")
    
    # Load model
    model = load_model(model_path)
    
    # Load class mappings if needed
    class_mapping = None
    if task != 'age':
        mapping_file = 'disease_classes.json' if task == 'label' else 'variety_classes.json'
        with open(mapping_file, 'r') as f:
            class_mapping = json.load(f)
    
    # Read the CSV file
    df = pd.read_csv(csv_path)
    
    # Process each image
    for index, row in df.iterrows():
        image_id = row['image_id']
        image_path = os.path.join(folder_path, image_id)
        
        if os.path.exists(image_path):
            # Preprocess image
            img = image.load_img(image_path, target_size=(224, 224))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0  # Normalize
            
            # Make prediction
            pred = model.predict(img_array)
            
            # Update DataFrame based on task
            if task == 'age':
                df.at[index, 'age'] = float(pred[0][0])
            else:
                pred_idx = np.argmax(pred[0])
                df.at[index, task] = class_mapping[str(pred_idx)]
    
    # Save updated CSV
    df.to_csv(csv_path, index=False)
    print(f"Predictions for {task} completed and saved to {csv_path}")

if __name__ == "__main__":
    # Example usage
    task = input("Enter task to run (label/variety/age): ").lower()
    
    # Default paths - modify these as needed
    model_paths = {
        'label': 'model/task1_finetuned_best.keras',
        'variety': 'model/Task2_Variety_CNN_FineTune_Dropout.keras',
        'age': 'model/task3_efficient_cnn_BEST.keras'
    }
    
    folder_path = "test_images"
    csv_path = "prediction_submission.csv"
    
    if task in model_paths:
        predict_func(task, model_paths[task], folder_path, csv_path)
    else:
        print("Invalid task. Please choose from: label, variety, age")
