// index.js
import express from 'express'; 
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => console.log("Database is connected..."))
    .catch((err) => console.log("Database ERROR NOT connected:", err.message));

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Auth route
app.use("/", authRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
