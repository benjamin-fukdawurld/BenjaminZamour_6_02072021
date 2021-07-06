import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { userId, priviledge } = jwt.verify(token, process.env.TOKEN_KEY);
        if(req.body.userId && req.body.userId !== userId) {
            throw { message: 'Invalid token' };
        }

        req.user = { userId, priviledge };

        next();
    } catch(error) {
        res.status(401).send(error);
    }
}