import { Employee } from "../models/Models";
import {
	Avatar,
	Grid,
	Card,
	CardActions,
	CardContent,
	Button,
} from '@mui/material';

type EmployeeDetailProps = {
	employee: Employee;
};

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

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
					<Avatar sx={{ bgcolor: stringToColor(employee.name) }}>
						{employee.name[0]}
					</Avatar>
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
