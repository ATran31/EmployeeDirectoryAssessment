
import { Department, Employee } from '../models/Models'
import { HTTPMethod, Service, Request, request } from './_abstract'



const Requests = {
    departments: new Request<Department[]>(HTTPMethod.get, "v1/department"),
    employees: new Request<Employee[]>(HTTPMethod.get, 'v1/employees')
}

class Backend implements Service {
    baseUrl = process.env.REACT_APP_API_HOST

    async listEmployees(): Promise<Employee[]> {
        return request(this, Requests.employees).call()
    }

    async listDepartments(): Promise<Department[]> {
        return request(this, Requests.departments).call()
    }
}


export default new Backend()