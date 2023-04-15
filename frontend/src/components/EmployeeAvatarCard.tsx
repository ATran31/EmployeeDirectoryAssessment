import { Employee } from "../models/Models";
import { Grid, Card, CardActions, CardContent, Button } from '@mui/material';

import { GenericUserAvatar } from './GenericUserAvatar';

type EmployeeDetailProps = {
	employee: Employee;
};

export const EmployeeDetailCard = ({ employee }: EmployeeDetailProps) => {
	return (
		<Grid item>
			<Card
				sx={{
					minHeight: 150,
					minWidth: 300,
				}}
			>
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<GenericUserAvatar
						employeeName={employee.name}
					></GenericUserAvatar>
					<CardActions>
						<Button size="small" href={`/employee/${employee.id}`}>
							{employee.name}
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</Grid>
	);
};
