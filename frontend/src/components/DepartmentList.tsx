import { useEffect, useState } from "react"
import { Department } from "../models/Models"
import api from "../utils/api"

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props: { row: Department }) {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.id}
				</TableCell>
				<TableCell>{row.name}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Employees
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Employee ID</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.employeeIds.map((emp) => (
										<TableRow key={emp}>
											<TableCell
												component="th"
												scope="row"
											>
												{emp}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export const DepartmentList = () => {
	const [departments, setDepartments] = useState<Department[] | undefined>();

	useEffect(() => {
		(async () => {
			try {
				setDepartments(await api.listDepartments());
			} catch (ex) {
				console.error(ex);
			}
		})();
	}, []);

	if (!departments) {
		return <p>Loading Departments...</p>;
	} else if (departments.length === 0) {
		return <p>No departments</p>;
	}

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell sx={{ fontWeight: 'bold' }}>
							Department ID
						</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>
							Department Name
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{departments.map((row) => (
						<Row key={row.name} row={row} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};