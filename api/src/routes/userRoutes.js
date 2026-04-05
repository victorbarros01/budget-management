import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

/* GET */
router.get('/me', authMiddleware, userController.getUser);

/* LOGIN */
router.post('/login', userController.loginUser);
router.post('/logout', authMiddleware, userController.logoutUser);

/* CREATE */
router.post('/create', userController.createUser);
router.get('/verify', userController.verifyEmail);
router.post('/resend', userController.resendVerifyEmail);

/* UPDATE */
router.put('/email', authMiddleware, userController.updateEmail);
router.put('/password', authMiddleware, userController.updatePassword);
router.put('/user', authMiddleware, userController.updateUser);

/* DELETE */
router.delete('/user/', authMiddleware, userController.deleteUser);

export default router;