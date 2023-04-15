export class HTTPError extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message)

        this.code = code
    }
}


export const notFound = new HTTPError(404, "Resource not found")