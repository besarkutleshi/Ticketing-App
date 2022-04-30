import express from 'express'
import { currentUser } from '@bkorg/common' 
const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
    return res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };