// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js'
import { getMyUrls, getUserDetails } from '../controllers/userController.js';


const userRouter = Router();


userRouter.get("/me", protect, getUserDetails);
userRouter.get("/my/urls", protect, getMyUrls);
export default userRouter;
