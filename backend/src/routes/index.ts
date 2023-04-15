import { Router, Response, Request } from 'express'

const router: Router = Router()

router.get('/v1/departments', (_req: Request, res: Response) => {
    res.send([
        {
            id: 2,
            name: "Full Stack Development",
            employeeIds: ["82338", "32673"]
        },
        {
            id: 3,
            name: "Connected Devices Engineering",
            employeeIds: ["82837"]
        },
        {
            id: 4,
            name: "Android Engineering",
            employeeIds: ["82837"]
        },
    ])
})

router.get('/v1/employees', (_unused: Request, res: Response) => {

    res.send([
        {
            id: "82837",
            name: "Bob Smith",
            birthday: new Date("1985-09-27"),
            bio: "Bob has been programming computers for entirely too long!",
            departmentId: "3"
        },
        {
            id: "81832",
            name: "Ada Burr",
            birthday: new Date("1985-10-18"),
            bio: "Ada loves full stack development.",
            departmentId: "4"
        },
        {
            id: 82338,
            name: "Molly Davis",
            birthday: new Date("1985-09-27"),
            bio: "Molly once found a bug in a compiler",
            departmentId: "2"
        },
        {
            id: "32673",
            name: "François Allende",
            birthday: new Date("1985-09-27"),
            bio: "François is the best QA engineer West of the Susquehanna river.",
            departmentId: "2"
        },
        {
            id: "zc",
            name: "Juan Cortez",
            birthday: '1984-09-22',
            bio: "Juan's been programming computers since the days of ATARI BASIC.",
            departmentId: "4"
        }
    ])
})

export default router