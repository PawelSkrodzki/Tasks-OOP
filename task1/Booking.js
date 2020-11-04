import { v4 as uuid } from 'uuid'
import { throwErrorIsClassIsNotSameInstance } from './validation'
import { isElementOfClassExistInArray } from './utils'
import Book from './Book'
import User from './User'

const sevenDays = 7 * 24 * 60 * 60 * 1000
const penaltyPerDay = 5

// Nasze założenie 1 booking == 1 książka
// Dlatego że dateOfRent i ExpectedReturn należą do Booking a nie do książki
// do bookingów dodajemy po jednej książce tak jak w pawdziwej bibliotece - skanowanie pierwszej książki -> dodanie do listy, skanowanie drugiej książki -> dodanie do listy


class Booking {
    constructor(user) {
        throwErrorIsClassIsNotSameInstance(user, User)
        this.id = uuid()
        this.dateOfRent = new Date()
        this.dateOfExpectedReturn = new Date(Date.now() + sevenDays)
        this.fee = 0
        this.user = user
        this.rentedBook = {}
    }

    addBook(book) {
        throwErrorIsClassIsNotSameInstance(book, Book)
        this.rentedBook = book
    }

    removeBook(book) {
        throwErrorIsClassIsNotSameInstance(book, Book)
        const dateOfReturn = new Date()
        if (this.rentedBook !== book) {
            throw new Error('This book is not the same as rented book')
        }

        if (this.dateOfExpectedReturn.getTime() < dateOfReturn.getTime()) {
            const differenceInTime = dateOfReturn.getTime() - this.dateOfExpectedReturn.getTime();
            const oneDayMilliseconds = 1000 * 3600 * 24
            const differenceDays = Math.round(differenceInTime / oneDayMilliseconds)
            this.fee = differenceDays * penaltyPerDay
            this.rentedBook = {}
            return `You have to pay ${Math.round(this.fee)}`
        }
        this.rentedBook = {}

        return `Book has returned in time`
    }

}


export default Booking