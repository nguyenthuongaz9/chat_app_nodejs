
import { Router} from "express"
import { checkAuth, login, logout, register, resendVerificationToken, verifyEmail } from "../controllers/auth.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js"


const authRouter = Router()

authRouter.post('/login', login)

authRouter.post('/register', register)
authRouter.post('/verify-email', verifyEmail);
authRouter.get('/check-auth', verifyToken, checkAuth);
authRouter.post('/resend-verification-code', resendVerificationToken);
authRouter.post('/logout', logout)

authRouter.post('/logout', ()=>{})



export default authRouter