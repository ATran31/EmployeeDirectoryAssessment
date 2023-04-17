import React from "react";
import { Employee } from "../models/Models";
import api from "../utils/api";
import { EmployeeDetailCard } from './EmployeeAvatarCard';
import { GenericErrorMessage } from './GenericErrorMessage';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';

type EmployeeListProps = {};
type EmployeeListState = {
	allEmployees?: Employee[];
	error: boolean;
};

export class EmployeeList extends React.Component<
	EmployeeListProps,
	EmployeeListState
> {
	state: EmployeeListState = { error: false };

	componentDidMount() {
		const self = this;
		api.listEmployees()
			.then((employees) => self.setState({ allEmployees: employees }))
			.catch((err) => {
				self.setState({ error: true });
			});
	}

	render() {
		if (this.state.error) {
			return <GenericErrorMessage />;
		}
		return (
			<div className="employee_list_page">
				<h2>Employee List</h2>
				<Grid container spacing={3} justifyContent={'space-evenly'}>
					{!this.state.error && !this.state.allEmployees && (
						<CircularProgress />
					)}
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

