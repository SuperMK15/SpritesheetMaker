# Spritesheet Generator

A web application that allows users to generate a spritesheet from a set of uploaded images, arrange them in a jagged matrix, and customize the sprite dimensions, padding, and layout. This tool is built with React and Flask and styled using Tailwind CSS.

## Features

- Upload images and arrange them in a customizable jagged matrix.
- Adjust sprite width, height, and padding.
- Generate a downloadable spritesheet based on user input.
- Interactive interface with a scrollable matrix and image name selection dropdown.
- Option to delete rows from the matrix.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (for generating spritesheets)
- **Other**: Axios (for API calls), FileReader API (for base64 encoding images)

## Installation

### Prerequisites

1. Node.js (for React app)
2. Python 3.6+ (for Flask backend)
3. Flask

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/spritesheet-generator.git
cd spritesheet-generator
```

### Step 2: Setup the Flask Backend

1. Create a virtual environment:

```bash
python3 -m venv venv
```

2. Install the required Python dependencies:
```bash
pip install -r backend/requirements.txt
```

### Step 3: Setup the React Frontend

1. Navigate to the `frontend` folder:

```bash
cd frontend
```

2. Install the required Node.js dependencies:
```bash
npm install
```

### Step 4: Run the Application

#### Start the Flask Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Run the Flask server:
```bash
flask run
```

By default, the Flask server will run on `http://127.0.0.1:5000`.

### Start the React Frontend

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Run the React app:
```bash
npm start
```

By default, the React app will run on `http://127.0.0.1:5173`.

## Usage

1. **Upload Images**: Click the file input to upload your images.
2. **Arrange Images**: Use the matrix editor to arrange your images by entering the image names or selecting them from a dropdown. 
3. **Set Sprite Dimensions**: Specify the sprite width, height, and padding.
4. **Generate Spritesheet**: Click the "Generate Spritesheet" button to create the spritesheet based on the entered parameters.
5. **Download Spritesheet**: After the spritesheet is generated, you can download it by clicking the "Download Spritesheet" button.
