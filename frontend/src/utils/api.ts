
import { Department, Employee } from '../models/Models'
import { HTTPMethod, Service, Request, request } from './_abstract'



const Requests = {
	departments: new Request<Department[]>(HTTPMethod.get, 'v1/departments'),
	employees: new Request<Employee[]>(HTTPMethod.get, 'v1/employees'),
};

class Backend implements Service {
	baseUrl = process.env.REACT_APP_API_HOST;

	async listEmployee(id: number): Promise<Employee> {
		return request(
			this,
			new Request<Employee>(HTTPMethod.get, `v1/employees/${id}`)
		).call();
	}

	async listDepartment(id: number): Promise<Department> {
		return request(
			this,
			new Request<Department>(HTTPMethod.get, `v1/departments/${id}`)
		).call();
	}

	async listEmployees(): Promise<Employee[]> {
		return request(this, Requests.employees).call();
	}

	async listDepartments(): Promise<Department[]> {
		return request(this, Requests.departments).call();
	}
}


export default new Backend()