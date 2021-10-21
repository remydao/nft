import express, {Router} from "express";
import { User } from "../sequelize/sequelize";
import { userModel } from "../models/user-model"
import {checkTokenMiddleware, extractBearerToken} from "../services/authorization";
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const router = express.Router()

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({message: 'Error. Please enter the correct username and password'})
    console.log(`req body : ${JSON.stringify(req.body)}`)

    try {
        const user: any = await User.findOne({
            where: {
                password: req.body.password,
                email: req.body.email
            }
        })
        console.log(user)
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

// route de test

router.get('/test', checkTokenMiddleware, (req : any, res : any) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, { complete: false })

    return res.json({ content: decoded })
})

router.get('/testadmin', checkTokenMiddleware, (req : any, res : any) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Décodage du token
    const decoded = jwt.decode(token, {complete: false})
    if (decoded.content.role !== "admin")
        return res.status(401).send("unauthorized")
    return res.json({content: decoded})
})

module.exports = router;