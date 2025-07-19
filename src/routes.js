import { Router } from 'express';
import { chatHandler } from './controller.js';

const router = Router();

router.post('/chat', chatHandler);

export default router;