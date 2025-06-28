from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient 
from dotenv import load_dotenv
import os
from datetime import datetime, timezone

# Load environment variables from .env
load_dotenv()

app = Flask(__name__) 
CORS(app)

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.portfolio
comments = db.comments

# endpoints
@app.route("/api/comment", methods=["POST"])
def submit_comment():
    try:
        data = request.get_json()

        # Extract form fields
        comment_data = {
            "name": data.get("name"),
            "email": data.get("email"),
            "message": data.get("message"),
            "time": datetime.now(timezone.utc)  
        }

        # Save to MongoDB
        result = comments.insert_one(comment_data)

        return jsonify({
            "success": True,
            "message": "Message sent successfully!",
            "id": str(result.inserted_id)
        }), 201
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
    
# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check(): 
    try: 
        # Check database connection 
        db.command('ping') 
        return jsonify({
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.now(timezone.utc).isoformat()
        })  
    except Exception as e: 
        return jsonify({
            "status": "unhealthy", 
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.now(timezone.utc).isoformat()
        }), 500
    

@app.route("/api/comment-count", methods=["GET"])
def get_comment_count():
    try:
        count = comments.count_documents({})
        return jsonify({ "count": count }), 200
    except Exception as e:
        return jsonify({ "error": str(e) }), 500

# for chatbot

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
from Chatbot.model import NeuralNet
from Chatbot.nltk_utils import bag_of_words, tokenize
import torch
import json
import random

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
CHATBOT_DIR = os.path.join(ROOT_DIR, 'Chatbot')

# Load intents.json with correct encoding
with open(os.path.join(CHATBOT_DIR, 'intents.json'), 'r', encoding='utf-8') as f:
    intents = json.load(f)

# Load model
data = torch.load(os.path.join(CHATBOT_DIR, 'data.pth'))


input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data["all_words"]
tags = data["tags"]
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size)
model.load_state_dict(model_state)
model.eval()

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']
    sentence = tokenize(message)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    if prob.item() > 0.70:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                return jsonify({"response": random.choice(intent["responses"])})
    return jsonify({"response": "I do not understand..."})

if __name__ == "__main__":
    app.run(debug=True)