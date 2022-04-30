import express, { Request, Response } from 'express'
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/api/users/signin',
    [

        body('email').isEmail().withMessage("Email must be valid!"),
        body('password').trim().notEmpty().withMessage("You must suppy a password!")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existsUser = await User.findOne({ email, password });
        if(!existsUser){
            throw new BadRequestError('Invalid email or password!');
        }
        const userJwt = jwt.sign({
            id: existsUser.id,
            email: existsUser.email
        }, process.env.JWT_KEY!);
        console.log(userJwt);
        
        
        return res.status(200).cookie('token', userJwt, {
            httpOnly: true,
            secure: true
        }).send(existsUser);
    }
);

export { router as signInRouter };