"use strict";
const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};
class AppError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
//api Specific Errors
class APIError extends AppError {
    constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, message = `Internal Server Error`) {
        super(name, statusCode, message);
    }
}
class BadRequestError extends AppError {
    constructor(name, statusCode = STATUS_CODES.BAD_REQUEST, message = `Bad Request Error`) {
        super(name, statusCode, message);
    }
}
class ValidationError extends AppError {
    constructor(name, statusCode = STATUS_CODES.BAD_REQUEST, message = `Validation Error`) {
        super(name, statusCode, message);
    }
}
module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    STATUS_CODES,
};
