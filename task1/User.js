import { v4 as uuid } from 'uuid'
import { validateString } from './validation';
import { validateEmail } from './utils'

class User {
    constructor(name, surname, email) {
        validateString(name)
        validateString(surname)
        validateEmail(email)

        this.id = uuid();
        this.name = name
        this.surname = surname
        this.email = email
    }

}

export default User