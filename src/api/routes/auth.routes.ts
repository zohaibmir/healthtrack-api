import { Router } from 'express';
import AuthController from '../../controllers/auth.controller';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();

// Login route
router.post('/login', asyncHandler(AuthController.login)); // Wrap login with asyncHandler

export default router;
