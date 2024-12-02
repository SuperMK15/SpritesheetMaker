from flask import Flask, request, jsonify
from flask_cors import CORS
from spritesheet_utils import create_spritesheet

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/generate-spritesheet', methods=['POST'])
def generate_spritesheet():
    try:
        data = request.json
        matrix = data.get('matrix', [])
        images = data.get('images', {})
        sprite_width = int(data.get('sprite_width', 64))
        sprite_height = int(data.get('sprite_height', 64))
        padding = int(data.get('padding', 0))

        # Generate spritesheet
        spritesheet_base64 = create_spritesheet(matrix, images, sprite_width, sprite_height, padding)

        return jsonify({'spritesheet': f"data:image/png;base64,{spritesheet_base64}"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
