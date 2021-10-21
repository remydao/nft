const jwt = require('jsonwebtoken')
//import { jwt } from "jsonwebtoken";

// get BearerToken
const extractBearerToken = (headerValue : any) => {
    if (typeof headerValue !== 'string')
        return false
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

// Verify Token
const checkTokenMiddleware = (req: any, res: any, next: any) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, process.env.SECRET_TOKEN, (err: any, decodedToken: any) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}

export { extractBearerToken, checkTokenMiddleware }