import isJs from 'is_js'
import moment from 'moment';


function validatePassword(inputPassword) {
    const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

    if (!pattern.test(inputPassword)) {
        throw new Error('Password should contain min 8 signs, 1 big letter, one number and one special sign')
    }

}

function validateBirthday(input) {
    const isCorrectDate = moment(input, "DD/MM/YYYY").format();

    if (isCorrectDate === 'Invalid date') {
        throw new Error('incorrect date')
    }

    return isCorrectDate
}

function validateGender(input) {

    const isCorrectGender = ["male", "female"].filter(item => item === input)[0];
    if (typeof isCorrectGender === 'undefined') {
        throw new Error('gender shuold be male or female')
    }

    return isCorrectGender
}

function validatePermission(input) {

    const isCorrectPerm = ["USER", "ADMIN"].filter(item => item === input)[0]
    if (typeof isCorrectPerm === 'undefined') {
        throw new Error('Perm shoudl be ADMIN OR USER')
    }

    return isCorrectPerm
}

function validateEmail(inputEmail) {
    if (!(isJs.email(inputEmail))) {
        throw new Error('Email shoud be email@test.com')
    }
}

function isUserExistInAppList(user, appList) {
    return appList.includes(user)
}

export {
    validatePassword,
    validateBirthday,
    validateGender,
    validateEmail,
    isUserExistInAppList,
    validatePermission
}
