from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import random
import string

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Dictionary to store shortened URLs
url_database = {}
BASE_URL = "http://127.0.0.1:5000"

def generate_short_code(length=6):
    """Generate a random short code."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

@app.route('/shorten', methods=['POST'])
def shorten_url():
    """API endpoint to shorten a URL."""
    data = request.get_json()
    original_url = data.get("originalUrl")

    if not original_url:
        return jsonify({"error": "Invalid URL"}), 400

    short_code = generate_short_code()
    url_database[short_code] = original_url

    return jsonify({"shortUrl": f"{BASE_URL}/{short_code}"})

@app.route('/<short_code>', methods=['GET'])
def redirect_url(short_code):
    """Redirect to the original URL if the short code exists."""
    original_url = url_database.get(short_code)

    if original_url:
        return redirect(original_url) 
    return jsonify({"error": "Short URL not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
