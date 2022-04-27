import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidatorError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[], message: string){
        super(message);
        Object.setPrototypeOf(this, RequestValidatorError.prototype);
    }
    serializeErrors(){
        const formattedErrors = this.errors.map(e => {
            return {message: e.msg, field: e.param };
        });
        return formattedErrors;
    }
}
