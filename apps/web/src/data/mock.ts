import { faker } from '@faker-js/faker';

export const testList = [
    {
      "id": "cb6a1221-b5f6-4cec-be5e-eb14bf7e6ad1",
      "productId": "a7803488-ac6b-4b74-b6f5-b2d51b0197f4",
      "shoppingCartId": "068ab7ac-aa7f-48c3-89cd-425446860f4a",
      "qty": 1
    },
    {
      "id": "8230bf20-9542-4f49-bff9-53777ba966e1",
      "productId": "9166b3dc-51c6-4dcb-b6fc-0bfa7cad19d5",
      "shoppingCartId": "07977406-28c6-4f51-be66-0f1a1f0bbff5",
      "qty": 3
    },
    {
      "id": "e3032cad-bb51-4f67-bafc-6c7a0dff104c",
      "productId": "38080d5e-9a39-445a-8d66-a9e6f97e14ae",
      "shoppingCartId": "ece9bea6-9653-4f80-bd41-a66e17620cbe",
      "qty": 2
    }
  ]

  const postToCustomer = (customer: Customer) => {
    console.log('entered postToCustomer')

    // Convert the data to a JSON string
    let customerJsonData = JSON.stringify(customer);

    // Use the fetch method with the POST method and the JSON data
    fetch("http://localhost:4000/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: customerJsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => console.log(data)) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('exiting postToCustomer')
  }

export const postToProduct = (product: Product) => {
    console.log('exiting postToProduct')
    // Convert the data to a JSON string
    let productJsonData = JSON.stringify(product);

    // Use the fetch method with the POST method and the JSON data
    fetch("http://localhost:4000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: productJsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => console.log(data)) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('exiting postToCustomer')
  }

  const postToCartItem = (cartItem: CartItem) => {
    console.log('entered postToCartItem')

    // Convert the data to a JSON string
    let jsonData = JSON.stringify(cartItem);

    // Use the fetch method with the POST method and the JSON data
    fetch("http://localhost:4000/cartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => console.log(data)) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('exiting postToCartItem')
  }

export const postToShoppingCart = (shoppingCart: ShoppingCart) => {
    console.log('entered postToShoppingCart')
    // Convert the data to a JSON string
    let jsonData = JSON.stringify(shoppingCart);

    // Use the fetch method with the POST method and the JSON data
    fetch("http://localhost:4000/shoppingCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => console.log(data)) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('exiting postToShoppingCart')
  }


  export const postToTestShoppingCart = () => {
    console.log('entered postToTestShoppingCart')

    const testCart = {
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        unitPrice: parseFloat(faker.commerce.price({ min: 100, max: 200 })), // 154.00,
        amountAvailable: faker.number.int({ max: 50 }), // 42,
        isInStock: true,
        description: faker.commerce.productDescription(),
        qty: faker.number.int({ min: 1, max: 5 }), // 42,
        image: faker.image.urlLoremFlickr({ category: 'business' })
    }

    // Convert the data to a JSON string
    let jsonData = JSON.stringify(testCart);

    // Use the fetch method with the POST method and the JSON data
    fetch("http://localhost:4000/testShoppingCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonData
    })
      .then(response => response.json()) // Parse the response as JSON
      .then(data => console.log(data)) // Do something with the data
      .catch(error => console.error(error)); // Handle any errors

    console.log('exiting postToTestShoppingCart')
  }


  const populateDb = () => {
    console.log('entered populateDb');

    var counter = 10;

    while (counter > 0) {
      const product: Product = {
        id: faker.string.uuid(),
        name: faker.commerce.product(),
        isActive: true,
        unitPrice: parseFloat(faker.commerce.price({ min: 100, max: 200 })), // 154.00,
        amountAvailable: faker.number.int({ max: 50 }), // 42,
        isInStock: true,
        description: faker.commerce.productDescription(),
      }

      const customer: Customer = {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        isActive: true,
      }

      const shoppingCart: ShoppingCart = {
        id: faker.string.uuid(),
        customerId: customer.id,
        isActive: true
      }

      const cartItem: CartItem = {
        id: faker.string.uuid(),
        productId: product.id,
        shoppingCartId: shoppingCart.id,
        qty: 1
      }

      postToProduct(product);
      postToCustomer(customer);
      postToShoppingCart(shoppingCart);
      postToCartItem(cartItem);
    }

    console.log('exiting populateDb');
  }
