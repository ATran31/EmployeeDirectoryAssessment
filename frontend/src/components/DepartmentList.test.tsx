import { Employee } from '../models/Models';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { DepartmentList } from './DepartmentList';
import fetch from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	fetch.resetMocks();
});

test('renders department directory', async () => {
	fetch
		.once(
			JSON.stringify([
				{
					id: 1,
					name: 'Full Stack Development',
					employeeIds: [82338],
				},
				{
					id: 2,
					name: 'Connected Devices Engineering',
					employeeIds: [82837],
				},
				{
					id: 3,
					name: 'Android Engineering',
					employeeIds: [82837],
				},
			])
		)
		.once(
			JSON.stringify({
				id: 1,
				name: 'Test Employee 1',
			})
		);

	render(<DepartmentList />);
	await waitFor(() => screen.getByRole('table'), { timeout: 5000 });
	const tbCol1 = screen.getByText(/Department ID/i);
	expect(tbCol1).toBeInTheDocument();
	const tbCol2 = screen.getByText(/Department Name/i);
	expect(tbCol2).toBeInTheDocument();
	const dep1 = screen.getByText(/Full Stack Development/i);
	expect(dep1).toBeInTheDocument();
	const dep2 = screen.getByText(/Connected Devices Engineering/i);
	expect(dep2).toBeInTheDocument();
	const dep3 = screen.getByText(/Android Engineering/i);
	expect(dep3).toBeInTheDocument();

	const rowExpand = screen.getAllByRole('button')[0];
	fireEvent.click(rowExpand);

	await waitFor(() => {
		expect(screen.getByText(/Employee Name/i)).toBeInTheDocument();
		expect(screen.getByText(/Test Employee 1/i)).toBeInTheDocument();
	});
});
