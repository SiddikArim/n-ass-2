### Structure

1. Create user data (POST) - `n-ass-2.vercel.app/api/users/`
   `{
        "userId": 8762153114,
        "username": "PHTes221qt13",
        "password": "password123",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "age": 25,
        "email": "phtest@example.com",
        "isActive": true,
        "hobbies": [
            "reading",
            "coding",
            "traveling"
        ],
        "address": {
            "street": "123 Main Street",
            "city": "Cityville",
            "country": "Countryland"
        }
}
`
2. Get the single user (GET)
   `n-ass-2.vercel.app/api/users/8762153112`
3. Add an Order (PUT)
   `n-ass-2.vercel.app/api/users/8762153112/orders`
   `{ "productName": "Latim",
"price": 15.44,
"quantity": 3 }`
4. Update an user (PUT)
   `n-ass-2.vercel.app/api/users/8762153112`
   `{
    "username": "15fghjklgt1a45456",
    "password": "1234ghdge56",
    "fullName": {
        "firstName": "Alfatun",
        "lastName": "Brown"
    },
    "age": 42,
    "email": "linda.brown@example.com",
    "isActive": true,
    "hobbies": [
        "yoga",
        "painting"
    ],
    "address": {
        "street": "987 Oak St",
        "city": "Cityville",
        "country": "USA"
    }
}`
5. Delete user (DELETE)
   `n-ass-2.vercel.app/api/users/8762153112`
6. Get all orders (GET)
   `n-ass-2.vercel.app/api/users/1/orders`
7. Calculate total price (GET)
   `n-ass-2.vercel.app/api/users/1/orders/total-price`

---

# Assignment 2

This is a Node.js Express application with TypeScript, integrated with MongoDB using Mongoose for user data and order management. Data integrity is ensured through validation using Joi.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   `https://github.com/SiddikArim/n-ass-2.git`

2. cd `n-ass-2`

3. Install dependencies: npm install
4. Create a `.env` file in the root of the project.

`NODE_ENV=development`
`PORT=5000`
`DATABASE_URL=mongodb+srv://as-2-admin:6YpHVWJ7LpEkUd8i@cluster0.g7lvcea.mongodb.net/n-ass-2
?retryWrites=true&w=majority`
`BCRYPT_SALT_ROUND=12`

5. Run the application: npm run start:dev
   This will start the application at `http://localhost:5000.`

6. API Endpoints -
   `/api/users` - POST - to create new user

`/api/users` - GET - to get all users

`/api/users/:userId` - GET - to get a single user

`/api/users/:userId` - PUT - to update a user

`/api/users/:userId` - DETELE - to delete a user

`/api/users/:userId/orders` - PUT - to add a new order to a specific user

`/api/users/:userId/orders` - GET - to get all orders of a specific user

`/api/users/:userId/orders/total-price` - GET - to get a total of a single users order.

7. Built with
   `Node.js`
   `Express.js`
   `TypeScript`
   `MongoDB`
   `Mongoose`
   `zod`
