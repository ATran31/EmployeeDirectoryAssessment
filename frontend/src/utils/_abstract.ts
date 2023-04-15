export enum HTTPMethod {
    head = "HEAD",
    get = "GET",
    put = "PUT",
    patch = "PATCH",
    post = "POST",
    delete = "DELETE"
}

export interface Headers { [s: string]: string; }

export class APIError {
    code: number
    message: string
    details?: object | null

    constructor(code: number, message: string, details?: object | null) {
        this.code = code
        this.message = message
        this.details = details
    }
}

export class Request<T> {
    method: HTTPMethod
    path: string
    parser: (data: any) => T

    constructor(method: HTTPMethod, path: string, parser: (data: any) => T = (data) => (data as T)) {
        this.method = method
        this.path = path
        this.parser = parser
    }
}

export class Response<T> {
    data?: T
    error?: Error

    constructor(data?: T, error?: Error) {
        this.data = data
        this.error = error
    }
}

export interface Service {

    // Represents the baseUrl for the service
    baseUrl: string
    
    /// Any specific headers for this service
    headers?: () => Promise<Headers>
}

export class Requestable<T> {
    service: Service
    request: Request<T>
    headers?: Headers
    body?: any
    query?: Record<string, string>

    constructor(service: Service, request: Request<T>) {
        this.service = service
        this.request = request
    }
    
    withHeaders(headers: Headers): Requestable<T> {
        this.headers = {
            ...this.headers,
            ...headers
        }
        return this
    }

    withBody(body: any): Requestable<T> {
        this.body = body
        return this
    }

    withQuery(params: object): Requestable<T> {
        this.query = {
            ...this.query,
            ...params
        }
        return this
    }

    async call(parseFunc: (v: any) => T = (v) => v as T): Promise<T> {

        let globalHeaders: { [key: string]: string }  = {}

        if (this.service.headers) {
            globalHeaders = {
                ...globalHeaders,
                ...(await this.service.headers())
            }
        }

        if (this.body) {
            globalHeaders['Content-Type'] = 'application/json'
        }

        let url = new URL(`${this.service.baseUrl}/${this.request.path}`)
        
        const q = this.query
        if (q) {
            Object.keys(q).forEach(key => url.searchParams.append(key, q[key]))
        }
        
        const response = await fetch(url.href, {
            method: this.request.method,
            headers: {
                ...globalHeaders,
                ...this.headers
            },
            body: this.body && JSON.stringify(this.body),
        })
        
        if (response.status >= 400) {
            const returnError = new APIError(response.status, response.statusText)
            returnError.details = await response.json().catch(ex => null)

            throw returnError
        }
        else if (response.status === 204) {
            return parseFunc(undefined);
        }
        
        try {
            const json = await response.json()
            return json
        }
        catch (ex) {
            
            console.error(ex)
            throw ex
        }
    }

    async rawCall(): Promise<globalThis.Response> {

        let globalHeaders: { [key: string]: string }  = {}

        if (this.service.headers) {
            globalHeaders = {
                ...globalHeaders,
                ...(await this.service.headers())
            }
        }

        if (this.body) {
            globalHeaders['Content-Type'] = 'application/json'
        }

        let url = new URL(`${this.service.baseUrl}/${this.request.path}`)
        const q = this.query
        if (q) {
            Object.keys(q).forEach(key => url.searchParams.append(key, q[key]))
        }
        
        const response = await fetch(url.href, {
            method: this.request.method,
            headers: {
                ...globalHeaders,
                ...this.headers
            },
            body: this.body && JSON.stringify(this.body),
        })
        
        if (response.status >= 400) {
            const returnError = new APIError(response.status, response.statusText)
            returnError.details = await response.json().catch(ex => null)

            throw returnError
        }
        
        return response
    }
}

export function request<T>(service: Service, request: Request<T>): Requestable<T> {
    return new Requestable<T>(service, request)
}