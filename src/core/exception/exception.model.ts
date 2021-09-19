import { HttpException, HttpStatus } from "@nestjs/common";
import { AppErrorCode } from "./exceptioncode.enum";

export class ApplicationException extends HttpException {
    constructor(private code: AppErrorCode = AppErrorCode.UNKNOWN_ERROR, statusCode: HttpStatus = HttpStatus.BAD_REQUEST, private  errMessage: string = "") {
        super(errMessage, statusCode);
    }

    getErrorCode(): AppErrorCode {
        return this.code;
    }
}