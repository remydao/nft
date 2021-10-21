import express from "express";
import { checkAdminTokenMiddleware, checkTokenMiddleware, extractToken, getLogin } from "../services/authorization";
const router = express.Router()

router.post('/login', getLogin)

//test route
router.get('/test', checkTokenMiddleware, (req : any, res : any) => {
    return res.json({ content: extractToken(req.headers.authorization)})
})

router.get('/testadmin', checkAdminTokenMiddleware, (req : any, res : any) => {
    const token = extractToken(req.headers.authorization)
    return res.json({content: token})
})

module.exports = router;