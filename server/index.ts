import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorHandler.js';
import { setupRoutes } from './routes/index.js';
import { setupWebSocket } from './websocket/index.js';
import { logger } from './utils/logger.js';
import { connectDB } from './config/mongodb.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB().catch(console.error);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
const uploadsPath = path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Set up WebSocket
setupWebSocket(io);

// Set up routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export { app, io };