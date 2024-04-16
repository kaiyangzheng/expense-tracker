# Libraries and Software

- Javascript
- Node.js
  - Express
  - dotenv
  - body-parser
- Next.js
  - React
  - Chakra-UI

# To run the project

1. Run the database dump
2. cd `expenses-api`
3. Create a .env file with the variables PORT=8080, DB_HOST=[MySQL host on local machine], DB_USER=[MySQL user on local machine], DB_PASSWORD=[MySQL password on local machine], DB_NAME=expense
4. Run `npm install`
5. Run `npm run dev`

6. cd `expense-tracker`
7. Create a .env file with the variable NEXT_PUBLIC_API_URL=http://localhost:8080
8. Run `npm install`
9. Run `npm run dev`
10. Go to `localhost:3000`
