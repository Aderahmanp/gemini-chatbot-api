# AI Chatbot Travel

A modern travel assistant chatbot web app powered by Google Gemini AI. This project helps users get travel recommendations, tips, and information about tourist attractions in a conversational, friendly, and interactive way.

---

## ✨ Features

- **Conversational AI**: Ask about destinations, attractions, tips, and more.
- **Travel-focused**: Gemini is guided to always answer with travel and tourism context.
- **Modern UI**: Clean, mobile-friendly, and inspired by Airbnb's design language.
- **Markdown Support**: Bot responses support bold, italic, and lists for better readability.
- **Session-based Chat**: Each user gets a contextual conversation.

---

## 🛠️ Tech Stack

- **Frontend**:  
  - HTML5, CSS3 (Airbnb-inspired, responsive)
  - Vanilla JavaScript (no framework)

- **Backend**:  
  - Node.js
  - Express.js
  - Google Generative AI SDK (`@google/generative-ai`)
  - dotenv (for environment variables)
  - CORS

---

## 🚀 Getting Started

1. **Clone this repo**  
   ```sh
   git clone <repo-url>
   cd Submission
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Set up your `.env` file**  
   ```
   PORT=3000
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run the server**  
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

5. **Open in browser**  
   Visit [http://localhost:3000/index.html](http://localhost:3000/index.html)

---

## 📁 Project Structure

```
Folder/
├── src/
│   ├── controller.js      # Chat logic and Gemini integration
│   ├── routes.js          # Express routes
│   ├── index.js           # Express app entry point
│   ├── index.html         # Frontend UI
│   ├── style.css          # Frontend styling
│   └── script.js          # Frontend logic
├── .env                   # Environment variables (not committed)
├── .gitignore
├── package.json
```

---

## 🧠 How it Works

- The frontend sends user messages to the backend `/chat` endpoint.
- The backend uses Google Gemini AI to generate travel-focused responses.
- Each session keeps its own chat history for context-aware replies.
- The UI displays chat bubbles with a modern, friendly look.

---

## 📦 Dependencies

- express
- cors
- dotenv
- @google/generative-ai
- nodemon (dev)

---

## 👤 Author

Aderahman P.

---

## 📜 License

ISC

---

**Enjoy your travel planning with AI!**