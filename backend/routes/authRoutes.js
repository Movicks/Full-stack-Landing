// AUTHROUTES .JS FILE
import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, getProfile } from '../controllers/authControllers.js';

const router = express.Router();

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173', "https://full-stack-landing.vercel.app"

    })
);

router.get('/', test);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
