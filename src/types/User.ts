// noinspection JSUnusedGlobalSymbols
// note: these types comes from the backend. they may not be all implemented

interface User {
    role : UserRole
    id: number
    name: string
}

export enum UserRole {
    User = 'User',
    Student = 'Student',
    Mentor = 'Mentor',
    Supervisor = 'Supervisor',
    CourseMaker = 'CourseMaker',
    Admin = 'Admin'
}

export default User;
