import { atom } from 'recoil'

export const authAtom = atom({ // Used for storing authentication data
    key: 'authAtom',
    default: null
});

export const studentDataAtom = atom({ // Used to store student information (main home page on sac)
    key: 'studentDataAtom',
    default: {}
});

export const userAssignmentsAtom = atom({ // used to store the student's courses and assignments
    key: 'userAssignmentsAtom',
    default: null
})

export const currentSelectedCourseAtom = atom({ // This is a workaround for not being able to pass params to the CourseInfo screen.
    key: 'currentSelectedCourseAtom',           // i'll figure it out someday
    default: {}
})

export const currentSelectedAssignmentAtom = atom({ // ditto
    key: 'currentSelectedAssignmentAtom',
    default: {}
})

export const announcementAtom = atom({ // used for storing announcements from the server
    key: 'announcementAtom',
    default: null
})

export const touchIDStatusAtom = atom({ // used for storing the status of the Touch ID status. Mostly just a cosmetic fix
    key: 'touchIDStatusAtom',
    default: null
})