import { User } from "../sequelize";
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config(); // load env file

// Get BearerToken
const extractBearerToken = (headerValue : any) => {
    if (typeof headerValue !== 'string')
        return false;

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2];
}

// Method to control admin user
const checkAdminTokenMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decodedToken: any) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        }
        else if (decodedToken.role !== "admin") {
            res.status(403).json({ message: 'You don\'t have the permission to access this endpoint' })
        }
        else {
            return next()
        }
    })
}

// Method to control logged users
const checkTokenMiddleware = (req: any, res: any, next: any) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decodedToken: any) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

// Login method
const getLogin = async (req: any, res: any) => {
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
        return res.status(500).json({ message: 'Error. Can\'t access to database' })
    }
}

// Extract the token from the autorization header
const extractToken = (token: any) => {
    const res = token && extractBearerToken(token);
    return jwt.decode(res, { complete: false })
}

export { extractBearerToken, checkTokenMiddleware, checkAdminTokenMiddleware, extractToken, getLogin }