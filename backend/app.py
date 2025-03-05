from flask import Flask, request, jsonify, redirect, render_template
import shortuuid
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="static", template_folder="../frontend")

CORS(app)

# In-memory storage for shortened URLs
url_store = {}

@app.route('/')
def home():
    """Serve the main homepage."""
    return render_template("index.html")

@app.route('/login')
def login():
    """Serve the login page."""
    return render_template("login.html")

@app.route('/shorten', methods=['POST'])
def shorten_url():
    """Shorten a URL and return the shortened version."""
    data = request.json  
    original_url = data.get("originalUrl")  

    if not original_url:
        return jsonify({"error": "Invalid URL"}), 400

    short_code = shortuuid.uuid()[:6]  
    url_store[short_code] = original_url  

    base_url = request.host_url.rstrip('/')
    short_url = f"{base_url}/{short_code}"
    return jsonify({"shortUrl": short_url})  

@app.route('/<short_code>', methods=['GET'])
def redirect_url(short_code):
    """Redirects a short URL to the original long URL."""
    original_url = url_store.get(short_code)

    if not original_url:
        return jsonify({"error": "URL not found"}), 404

    return redirect(original_url)  

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
