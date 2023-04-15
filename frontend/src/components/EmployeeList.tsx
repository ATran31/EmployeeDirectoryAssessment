import React from "react";
import { Employee } from "../models/Models";
import api from "../utils/api";
import { EmployeeDetailCard } from './EmployeeAvatarCard';
import { Grid } from '@mui/material';

type EmployeeListProps = {};
type EmployeeListState = {
	allEmployees?: Employee[];
};

export class EmployeeList extends React.Component<
	EmployeeListProps,
	EmployeeListState
> {
	state: EmployeeListState = {};

	componentDidMount() {
		const self = this;
		api.listEmployees().then((employees) =>
			self.setState({ allEmployees: employees })
		);
	}

	render() {
		return (
			<div className="employee_list_page">
				<h2>Employee List</h2>
				<Grid container spacing={3} justifyContent={'space-evenly'}>
					{!this.state.allEmployees && <p>Fetching employees</p>}
					{this.state.allEmployees?.map((employee) => (
						<EmployeeDetailCard
							key={employee.id}
							employee={employee}
						/>
					))}
				</Grid>
			</div>
		);
	}
}

