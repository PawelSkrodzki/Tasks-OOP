import { v4 as uuid } from 'uuid'
import { validatePassword, isUserExistInAppList } from './utils'
import User from './User'


const perms = {
    admin: 'ADMIN',
    user: 'USER'
}


class App {
    constructor() {
        this.id = uuid()
        this.users = []
    }


    addUserToApp(user) {
        if (!(user instanceof User)) {
            throw new Error(`${user} is not instance of class User`)
        }

        if (isUserExistInAppList(user, this.users)) {
            throw new Error(`${user} already exist in users list`)
        }

        this.users.push(user)
    }

    changeUserAccessLevel(superUser, user, newAccessLevel) {
        if (!(user instanceof User) && !(superUser instanceof User)) {
            throw new Error(`${user} is not instanceof class ${User}`);
        }

        if (!(isUserExistInAppList(superUser, this.users)) && !(isUserExistInAppList(user, this.users))) {
            throw new Error(`${superUser} does not exist in users list`)
        }

        if (!(superUser.accessLevel === 'ADMIN')) {
            throw new Error('SuperUser has to be ADMIN level')
        }

        const upperNewAccessLevel = newAccessLevel.toUpperCase()
        const isAccessLevelExistInPerms = Object.values(perms).filter(item => item === upperNewAccessLevel);

        if (isAccessLevelExistInPerms.length < 1) {
            throw new Error('accessValue shuold be user or admin')
        }

        if (user.accessLevel === upperNewAccessLevel) {
            throw new Error(`This User has already accessLevel: ${upperNewAccessLevel}`)
        }

        user.accessLevel = upperNewAccessLevel
    }

    changeUserPassword(superUser, user, newPassword) {
        if (!(user instanceof User) && !(superUser instanceof User)) {
            throw new Error(`${user} is not instanceof class ${User}`);
        }

        if (!(isUserExistInAppList(superUser, this.users)) && !(isUserExistInAppList(user, this.users))) {
            throw new Error(`${superUser} does not exist in users list`)
        }

        if (!(superUser.accessLevel === 'ADMIN')) {
            throw new Error('SuperUser has to be ADMIN level')
        }

        if (newPassword === user.password) {
            throw new Error('New password cannot be the same as old password')
        }

        validatePassword(newPassword)
        user.password = newPassword
    }

}



export default App