const jwt = require('jsonwebtoken')
//import { jwt } from "jsonwebtoken";

// get BearerToken
const extractBearerToken = (headerValue : any) => {
    if (typeof headerValue !== 'string')
        return false
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

//method to control admin user
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
            res.status(401).json({ message: 'You don\'t have the permission to access this endpoint' })
        }
        else {
            return next()
        }
    })
}

// method to control logged users
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

const extractToken = (token: any) => {
    const res = token && extractBearerToken(token);
    return jwt.decode(res, { complete: false })
}

export { extractBearerToken, checkTokenMiddleware, checkAdminTokenMiddleware, extractToken }