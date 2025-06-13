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
    

if __name__ == "__main__":
    app.run(debug=True, port=5001)

# @app.route("/api/stats", methods=["GET"])
# def get_stats():
#     try:
#         count = contacts.count_documents({})
#         latest = contacts.find().sort("_id", -1).limit(1)
#         latest_first_name = latest[0]["firstName"] if count > 0 else "N/A"
#         latest_last_name = latest[0]["lastName"] if latest_first_name != "N/A" else ""
        
#         return jsonify({
#             "total_submissions": count,
#             "latest_name": latest_first_name + " " + latest_last_name,
#         })
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

# from bson.json_util import dumps
# @app.route("/api/messages", methods=["GET"])
# def get_all_messages():
#     try:
#         messages = list(contacts.find().sort("_id", -1))
#         return dumps(messages), 200
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500
