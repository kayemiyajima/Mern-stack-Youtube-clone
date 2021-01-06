import express from 'express';
import { addUser, loginUser, authUser, logoutUser } from '../controllers/user.js';
import auth from '../Middleware/auth.js';

const router = express.Router();

router.post('/register', addUser);
router.post('/login', loginUser);
router.get('/auth', auth, authUser);
router.get('/logout', auth, logoutUser);

export default router;