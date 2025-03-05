from flask import Flask, request, jsonify, redirect
import shortuuid
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# In-memory storage for shortened URLs
url_store = {}

@app.route('/shorten', methods=['POST'])
def shorten_url():
    """
    Accepts a JSON request with an original URL,
    generates a short code, and stores it in the dictionary.
    Returns the shortened URL.
    """
    data = request.json  # Get JSON data from request
    original_url = data.get("originalUrl")  # Extract URL from JSON

    if not original_url:
        return jsonify({"error": "Invalid URL"}), 400

    short_code = shortuuid.uuid()[:6]  # Generate a unique short code
    url_store[short_code] = original_url  # Store mapping

    base_url = os.getenv("RENDER_EXTERNAL_URL", "http://localhost:5000")
    short_url = f"{base_url}/{short_code}"
    return jsonify({"shortUrl": short_url})  # Return the short URL

@app.route('/<short_code>', methods=['GET'])
def redirect_url(short_code):
    """
    Redirects a short URL to the original long URL.
    """
    original_url = url_store.get(short_code)

    if not original_url:
        return jsonify({"error": "URL not found"}), 404

    return redirect(original_url)  # Redirect to original URL

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
