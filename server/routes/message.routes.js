// routes/message.routes.js

import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getMessage, createMessage } from '../controllers/messenger.controller.js'


const messageRoutes = Router();

const initMessageRoutes = (io) => {
    messageRoutes.get('/', verifyToken, getMessage);
    messageRoutes.post('/', verifyToken, createMessage(io)); 
    return messageRoutes;
};

export default initMessageRoutes;
