import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import api from '../utils/api';
import { Employee } from '../models/Models';
import { GenericUserAvatar } from './GenericUserAvatar';

export const LinkedUser = (props: { employeeId: string }) => {
	const [employee, setEmployee] = useState<Employee | undefined>();
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			try {
				setEmployee(await api.listEmployee(parseInt(props.employeeId)));
			} catch (ex) {
				console.error(ex);
				setError(true);
			}
		})();
	}, [props.employeeId]);

	if (error) {
		return (
			<Typography>
				Unable to load data. Please contact an administrator.
			</Typography>
		);
	}
	if (employee) {
		return (
			<div style={{display: "flex"}}>
				<GenericUserAvatar
					sx={{ width: 30, height: 30 }}
					employeeName={employee.name}
				></GenericUserAvatar>
				<Button size="small" href={`/employee/${employee.id}`}>
					{employee.name}
				</Button>
			</div>
		);
	} else {
		return <Typography>Loading...</Typography>;
	}
};
