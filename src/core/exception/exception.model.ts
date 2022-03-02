import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorResponseData } from "./exceptioncode.enum";

export class ApplicationException extends HttpException {
    constructor(private error: ErrorResponseData, private data?: any) {
        super(error.message, error.status);
    }

    getErrorCode(): number {
        return this.error.code;
    }

    getData(): any {
        return this.data;
    }
}