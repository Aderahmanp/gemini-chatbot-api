import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash'
});




app.post('/chat', async (req, res) => {
    const message = req.body?.message;

    if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({
            error: 'Message is required and must be a non-empty string'
        });
    }

    try {
        const result = await model.generateContent(message);
        res.status(200).json({
            output: result.response.text(),
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to generate content',
            message: error.message
        });
    }
});
