import express from 'express'

const currentUser = require('@bkorg/common');
const router = express.Router();

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

router.get('/api/users/currentuser', currentUser, (req, res) => {
    return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };