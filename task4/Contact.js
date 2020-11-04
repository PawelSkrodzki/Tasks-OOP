import { v4 as uuid } from 'uuid'
import { validateString } from './validation'
import { validateEmail, isKeyExistInArray } from './utils'

class Contact {
    constructor(name, surname, email) {
        validateString(name);
        validateString(surname);
        validateEmail(email);
        this.id = uuid();
        this.date = new Date();
        this.name = name;
        this.surname = surname;
        this.email = email;
    }

    readData() {
        return {
            id: this.id,
            date: this.date.toString(),
            name: this.name.toLowerCase(),
            surname: this.surname.toLowerCase(),
            email: this.email,
        }
    }

    update(key, value) {
        validateString(key);
        validateString(value);
        if (isKeyExistInArray(key, ['name', 'surname', 'email'])) {
            throw new Error('Key does not exist in avaliableKeys')
        }
        const smallKey = key.toLowerCase();
        if (smallKey === "email") {
            validateEmail(value);
        }
        this[smallKey] = value;
        return "Contact was updated";
    }

    contains(phrase) {
        validateString(phrase)
        const allValues = Object.values(this.readData())
        if (allValues.find(el => el.toLowerCase().includes(phrase.toLowerCase()))) {
            return true
        }
        return false
    }
}

export default Contact