# AI Story Writer

AI Story Writer is a simple Flask-based chatbot application that generates stories in a poetic way. It utilizes OpenAI's language models to craft creative responses based on user input.

## Features
- Interactive chatbot that writes stories with a poetic twist
- Real-time streaming responses
- Easy-to-use Flask interface
- Simple deployment with environment configuration

## Prerequisites
- Python 3.x installed on your machine
- An OpenAI API key

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sairam-penjarla/ai_story_writer.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd ai_story_writer
   ```

3. **Install required dependencies:**
   Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

   Then install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your environment variables:**
   Create a `.env` file in the project root and add your OpenAI token and model name:
   ```
   TOKEN=your_openai_api_key
   MODEL_NAME=gpt-3.5-turbo
   ```

## Usage

1. **Run the application:**
   You can start the Flask server by running:
   ```bash
   python run.py
   ```

   Alternatively, run it without writing `.pyc` files:
   ```bash
   python -B run.py
   ```

2. **Access the chatbot:**
   Open your browser and navigate to `http://localhost:8000` to interact with the AI Story Writer.

## API Endpoints

### `POST /writer`
- **Description:** Accepts a user input and generates a story with poetic elements.
- **Request:** 
  - Body: JSON payload containing the `user_input` field.
- **Response:** A real-time streamed response of the story in chunks.

## Demo

You can watch a detailed video tutorial on my [YouTube Channel](PASTE URL HERE).

## License

This project is licensed under the MIT License.