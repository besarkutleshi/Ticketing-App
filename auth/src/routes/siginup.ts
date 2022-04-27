import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { RequestValidatorError } from '../errors/request-validation-error';
import { User } from '../models/user';
const router = express.Router();

router.post('/api/users/signup', 
    [
        body('email').isEmail().withMessage("Email must be valid!"),
        body('password').trim().isLength({min:4, max:20}).withMessage("Password must be between 4 and 20 characters!")
    ], 
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            throw new RequestValidatorError(errors.array(), "Invalid email or password!");
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw new BadRequestError('Email already exists, please try another email!');
        }
        const user = User.build({ email, password });
        await user.save();
        return res.status(201).send(user);
    }
);

export { router as signupRouter };