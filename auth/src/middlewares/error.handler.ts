import { NextFunction, Request, Response } from "express";
import { RequestValidatorError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof RequestValidatorError){
        const formattedErrors = err.errors.map(e => {
            return {message: e.msg, field: e.param}
        })
        return res.status(400).send({errors: formattedErrors});
    }
    if(err instanceof DatabaseConnectionError){
       return res.status(500).send({errors: [
           { message: err.reason }
       ]})
    }

    return res.status(400).send({
        errors: [{message: "Something went wrong!"}]
    });
};