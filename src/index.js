import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('src')); // <-- This serves index.html and assets

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash'
});




// Store chat history per session (simple in-memory, keyed by session id or IP)
const chatHistories = {};

app.post('/chat', async (req, res) => {
    const message = req.body?.message;
    // Use a simple session key (for demo: IP address)
    const sessionKey = req.ip;

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({
            error: 'Please provide a message to continue the conversation.'
        });
    }

    // Initialize chat history if not present
    if (!chatHistories[sessionKey]) {
        chatHistories[sessionKey] = [];
    }

    // Add user message to history
    chatHistories[sessionKey].push({ role: 'user', content: message });

    try {
        // Prepare context: flatten previous messages
        const context = chatHistories[sessionKey]
            .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
            .join('\n') + '\nBot:';

        const result = await model.generateContent(context);

        const botReply = result.response.text();

        // Add bot reply to history
        chatHistories[sessionKey].push({ role: 'bot', content: botReply });

        res.status(200).json({
            output: botReply,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to generate content',
            message: error.message
        });
    }
});
