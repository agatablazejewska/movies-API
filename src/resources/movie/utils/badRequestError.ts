import { CustomError } from 'ts-custom-error'

export default class BadRequestError extends CustomError {
    constructor(public code: number, message?: string)
    {
        super(message)
    }
}