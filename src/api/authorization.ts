import express from "express";
import { checkAdminTokenMiddleware, checkTokenMiddleware, extractToken, getLogin } from "../services/authorization";
const router = express.Router()

router.post('/login', getLogin)

router.get('/testadmin', checkAdminTokenMiddleware, (req : any, res : any) => {
    const token = extractToken(req.headers.authorization)
    return res.json({content: token})
})

module.exports = router;