import express from 'express';
import sequelize from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import './models/associations.js'
import './config/dotenv.js'
import { errorHandler } from './middleware/errorHandler.js';

// DB connect
export const app = express()
app.use(express.json())

// CORS Policy 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Cookie connect
app.use(cookieParser());

// Uploads connect
app.use('/uploads', express.static('uploads'));

// Routes
// app.use('/user', userRoutes)
// app.use('/task', taskRoutes)

// Error handler
app.use(errorHandler);

// DB Sync and Server start (if all good)
sequelize.sync().then(() => {
  console.log('База данных синхронизирована');
  app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
  });
}).catch(err => {
  console.error('Ошибка синхронизации базы:', err);
});

