import { Router, Response, Request } from 'express';

const router: Router = Router();

const employees = [
	{
		id: 82837,
		name: 'Bob Smith',
		birthday: new Date('1985-09-27'),
		bio: 'Bob has been programming computers for entirely too long!',
		departmentId: [3, 4],
	},
	{
		id: 81832,
		name: 'Ada Burr',
		birthday: new Date('1985-10-18'),
		bio: 'Ada loves full stack development.',
		departmentId: [4],
	},
	{
		id: 82338,
		name: 'Molly Davis',
		birthday: new Date('1985-09-27'),
		bio: 'Molly once found a bug in a compiler',
		departmentId: [2],
	},
	{
		id: 32673,
		name: 'François Allende',
		birthday: new Date('1985-09-27'),
		bio: 'François is the best QA engineer West of the Susquehanna river.',
		departmentId: [2],
	},
	{
		id: 1,
		name: 'Juan Cortez',
		birthday: new Date('1984-09-22'),
		bio: "Juan's been programming computers since the days of ATARI BASIC.",
		departmentId: [4],
	},
];

const departments = [
	{
		id: 2,
		name: 'Full Stack Development',
		employeeIds: [82338, 32673],
	},
	{
		id: 3,
		name: 'Connected Devices Engineering',
		employeeIds: [82837],
	},
	{
		id: 4,
		name: 'Android Engineering',
		employeeIds: [1, 81832, 82837],
	},
];

router.get('/v1/departments', (_req: Request, res: Response) => {
	res.send(departments);
});

router.get('/v1/departments/:id', (_req: Request, res: Response) => {
	const { id: deptId } = _req.params;
	const record = departments.filter(
		(dept) => parseInt(deptId) === dept.id
	)[0];
	if (record) {
		return res.status(200).json(record);
	}
	return res.status(404).end();
});

router.get('/v1/employees', (_unused: Request, res: Response) => {
	res.send(employees);
});

router.get('/v1/employees/:id', (_req: Request, res: Response) => {
	const { id: employeeId } = _req.params;
	const record = employees.filter(
		(emp) => parseInt(employeeId) === emp.id
	)[0];
	if (record) {
		return res.status(200).json(record);
	}
	return res.status(404).end();
});

export default router;
