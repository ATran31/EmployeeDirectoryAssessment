import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Paper, Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

import { Employee } from '../models/Models';
import api from '../utils/api';
import { GenericUserAvatar } from './GenericUserAvatar';
import { GenericErrorMessage } from './GenericErrorMessage';

interface RouteParams {
	id: string;
}

const ProfilePaper = styled(Paper)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	margin: '20px',
	width: '80%',
	height: '400px',
});

interface DetailedEmployee extends Employee {
	department?: string;
}

export const EmployeeDetail = () => {
	const [employee, setEmployee] = useState<DetailedEmployee | undefined>();
	const [error, setError] = useState(false);
	const { id } = useParams<RouteParams>();
	useEffect(() => {
		(async () => {
			try {
				let employee = await api.listEmployee(parseInt(id));
				const department = await api.listDepartment(
					parseInt(employee.departmentId)
				);
				const detailedEmployee: DetailedEmployee = { ...employee };
				detailedEmployee.department = department.name;
				setEmployee(detailedEmployee);
			} catch (ex) {
				console.error(ex);
				setError(true);
			}
		})();
	}, [id]);
	if (error) {
		return <GenericErrorMessage />;
	} else if (employee) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<ProfilePaper elevation={3}>
					<GenericUserAvatar
						sx={{
							width: 50,
							height: 50,
						}}
						employeeName={employee.name}
					></GenericUserAvatar>
					<Typography variant="h5" sx={{ my: 2 }}>
						{employee.name}
					</Typography>
					{Object.keys(employee)
						.filter(
							(attr) => !['name', 'departmentId'].includes(attr)
						)
						.map((attr) => {
							const titledAttr =
								attr[0].toUpperCase() + attr.slice(1);
							let attrVal =
								employee[attr as keyof DetailedEmployee];
							if (
								typeof attrVal === 'string' &&
								attrVal.match(/\d{4}-\d{2}-\d{2}T*/)
							) {
								attrVal = attrVal.split('T')[0];
							}
							return (
								<Typography
									key={`${employee.id}-${attr}`}
									paragraph
									align="left"
								>
									<b>{titledAttr}</b>: {attrVal}
								</Typography>
							);
						})}
				</ProfilePaper>
			</Box>
		);
	}
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Grid container spacing={3} justifyContent={'space-evenly'}>
				<CircularProgress />
			</Grid>
		</Box>
	);
};
