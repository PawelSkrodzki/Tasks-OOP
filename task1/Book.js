import { v4 as uuid } from 'uuid'
import { validateString } from './validation'

class Book {
    constructor(title, author, description) {
        validateString(title)
        validateString(author)
        validateString(description)

        this.id = uuid()
        this.img = `https://picsum.photos/200/300`
        this.title = title
        this.author = author
        this.description = description
    }
}

export default Book