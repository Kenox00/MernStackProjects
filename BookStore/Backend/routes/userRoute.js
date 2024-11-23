import express from "express";
const router = express.Router();
import { Signup, Login } from '../controllers/userController.js';

router.post('/signup', Signup);
router.post('/Login', Login);

export default router;
