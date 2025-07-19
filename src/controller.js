import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash'
});

// Store chat history per session (simple in-memory, keyed by session id or IP)
const chatHistories = {};

const SYSTEM_PROMPT = `
You are a travel assistant chatbot. Your main focus is to answer any questions about tourist attractions, including recommendations, ticket prices, opening hours, facilities, directions, travel tips, and other important tourism info.
Respond clearly, politely, and helpfully.
If the question is unrelated to tourism, kindly guide the user back to the topic of tourist attractions.
`;

export const chatHandler = async (req, res) => {
    const message = req.body?.message;
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
        // Prepare context: include system prompt and flatten previous messages
        const context =
            SYSTEM_PROMPT +
            '\n' +
            chatHistories[sessionKey]
                .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
                .join('\n') +
            '\nBot:';

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: context }] }],
            generationConfig: {
                temperature: 0.3,
                topK: 15,
                topP: 0.7,
                maxOutputTokens: 250
            }
        });

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
};