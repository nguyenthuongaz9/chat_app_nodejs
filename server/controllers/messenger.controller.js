import Message from '../models/message.js';

export const createMessage = (io) => async (req, res) => {
    try {
        const userId = req.userId;
        const body = req.body;

        const { message, conversationId } = body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!message || !conversationId) {
            return res.status(400).json({ message: 'Invalid request' });
        }

        const newMessage = await Message.create({
            conversationId,
            sender: userId,
            content: message,
        })
        

        if (!newMessage) {
            return res.status(400).json({ message: 'Failed to create message' });
        }

        const populatedMessage = await newMessage.populate('sender', ['_id', 'lastName', 'firstName', 'imageUrl']);

        io.emit(`new_message_${conversationId}`, populatedMessage);
        console.log(`Emitted new_message event to conversationId: ${conversationId}`, populatedMessage);
        return res.status(201).json({ message: populatedMessage });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
};

export const getMessage = async (req, res) => {
    try {
        const conversationId = req.query.conversationId;
        const cursor = parseInt(req.query.cursor) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (!conversationId) {
            return res.status(400).json({ message: 'Invalid conversationId' });
        }

        const messages = await Message.find({ conversationId: conversationId })
            .populate('sender', ['_id', 'lastName', 'firstName', 'imageUrl'])
            .skip((cursor - 1) * limit)
            .limit(limit)
            .sort({ createdAt: 'desc' });

        const totalMessages = await Message.countDocuments({ conversationId: conversationId });
        const hasNextPage = totalMessages > (cursor * limit);
       
        if (!messages) {
            return res.status(404).json({ message: 'No messages found' });
        }

        return res.status(200).json({
            success: true,
            messages,
            nextCursor: hasNextPage ? cursor + 1 : null
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
    }
};