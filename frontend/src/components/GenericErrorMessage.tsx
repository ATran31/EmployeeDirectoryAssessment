import { Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';

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

export const GenericErrorMessage = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<ProfilePaper elevation={3}>
				<ErrorIcon sx={{ height: 100, width: 100, color: '#FF2E2E' }} />
				<Typography variant="h4">
					Opps looks like something went wrong! We are working on
					fixing it.
				</Typography>
			</ProfilePaper>
		</Box>
	);
};
