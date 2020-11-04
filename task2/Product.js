import { v4 as uuid } from 'uuid'
import { validateString, validateNumber, isPositiveNumber } from './validation'
import { isElementExistInArray } from './utils'

class Product {
    constructor(name, price, initialCategory) {
        validateString(name, 'name')
        validateNumber(price, 'price')
        validateString(initialCategory, 'initialCategory')

        this.id = uuid();
        this.name = name;
        this.price = price;
        this.discountedPrice = price;
        this.categories = [initialCategory];
        this.discount = null;
        this.quantity = 1;
    }

    read() {
        return `
          Id: ${this.id}
          Name: ${this.name}
          Price: ${this.price}
          Quantity: ${this.quantity}
          Discount: ${this.discount}
          Category: ${this.initialCategory}`
    }

    addDiscount(discount) {
        isPositiveNumber(discount);
        this.discount = discount;
        const finalPrice = this.price - (discount * this.price) / 100
        this.discountedPrice = finalPrice
        return `Product ID: ${this.id} now costs ${finalPrice}`;
    }

    addCategory(category) {
        validateString(category, 'category');
        const smallCategories = this.categories.map(el => el.toLowerCase())
        const smallCategory = category.toLowerCase();
        if (smallCategories.includes(smallCategory)) {
            throw new Error('This category already exist')
        }
        this.categories.push(category);
    }


    removeCategory(category) {
        validateString(category, 'category');
        const smallCategories = this.categories.map(el => el.toLowerCase())
        const smallCategory = category.toLowerCase()
        const categoryIndex = smallCategories.indexOf(smallCategory)
        if (categoryIndex === -1) {
            throw new Error('Category does not exist')
        }
        this.categories.splice(categoryIndex, 1)
    }

    update(key, value) {
        validateString(key);
        if (isElementExistInArray(key, ['name', 'price'])) {
            throw new Error('this key is not able to change')
        }
        const smallKey = key.toLowerCase();
        if (smallKey === "price") {
            validateNumber(value);
            this[smallKey] = value;
            return "Product was updated";
        }

        validateString(value)
        this[smallKey] = value;
        return "Product was updated";
    }
}

export default Product