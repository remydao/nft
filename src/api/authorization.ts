import express, {Router} from "express";
import { User } from "../sequelize/sequelize";
import { userModel } from "../models/user-model"
import {
    checkAdminTokenMiddleware,
    checkTokenMiddleware,
    extractBearerToken,
    extractToken
} from "../services/authorization";
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const router = express.Router()

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({message: 'Error. Please enter the correct username and password'})
    try {
        const user: any = await User.findOne({
            where: {
                password: req.body.password,
                email: req.body.email
            }
        })
        if (!user)
            return res.status(400).json({ message: 'Error. Wrong login or password' })

        const token = jwt.sign({
            id : user.id,
            name: user.name,
            role: user.role
        }, process.env.TOKEN_SECRET, { expiresIn: '1800s' })

        return res.json({ access_token: token })
    }
    catch (err) {
        return res.status(400).json({ message: 'Error. Can\'t access to database' })
    }
})





router.get('/test', checkTokenMiddleware, (req : any, res : any) => {
    return res.json({ content: extractToken(req.headers.authorization)})
})

router.get('/testadmin', checkAdminTokenMiddleware, (req : any, res : any) => {
    const token = extractToken(req.headers.authorization)
    return res.json({content: token})
})





module.exports = router;