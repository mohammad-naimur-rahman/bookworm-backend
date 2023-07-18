# Bookworm MERN Stack Project

📚 Bookworm is a book listing application where users can share their favorite books with the world. It offers various features such as book listing, wishlist, and reading list functionalities. The application includes authentication and authorization systems to ensure protection from unwanted actions. Explore the live application to discover more about its capabilities!

#### This is the backend part of the application

## Live Links

**Frontend**: [Bookworm React TypeScript](https://bookworm-react-typescript.netlify.app/)

**Backend**: [Bookworm Server Backend](https://bookworm-server-backend.vercel.app/)

## Repository links

**Frontend**: [Bookworm Frontend Repository](https://github.com/mohammad-naimur-rahman/bookworm-frontend)

**Backend**: [Bookworm Backend Repository](https://github.com/mohammad-naimur-rahman/bookworm-backend)

## Features

✨ Fully dynamic application with modern technology stack\
🔒 Authentication and authorization system\
📖 Book listing and ownership for easy updating and deletion\
🌗 Persistent dark mode and light mode for enhanced user experience\
📱 Fully responsive design, optimized for screen sizes up to iPhone 5\
🔍 Pagination, searching, and advanced filtering for finding desired books\
⚛️ Built with TypeScript for enhanced type safety and code quality

## Libraries and Tools Used

- **Server:** - Node.js, Express.js
- **Type safety & validation:** - TypeScript, Zod
- **Database:** MongoDB, Mongoose
- **Authorization:** Firebase admin
- **Precommit Hooks and Linting:** ESLint, Prettier, Husky, Lint-staged, Airbnb ESLint Config

## Available Routes

### Auth

**Login**

POST - `/api/v1/auth/login`

**Signup**
POST - `/api/v1/auth/signup`

### Books

**To get all the books**

GET - `/api/v1/books`

**To get a single book**

GET - `/api/v1/books/:id`

**To add a book**

POST - `/api/v1/books`

**To update a book**

PATCH - `/api/v1/books/:id`

**To delete a book**

DELETE - `/api/v1/books/:id`

**To add a book**

POST - `/api/v1/books`

**To post a review to a book**

POST - `/api/v1/books/comment/:id`

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/mohammad-naimur-rahman/bookworm-backend.git
```

2. Install the dependencies

```bash
pnpm install
```

3. Create `.env` and put necessary values (Follow `.env.example`)

4. Run locally in the development server

```bash
pnpm dev
```

5. Go to `http://localhost:port` to access the project

6. For running the frontend part, follow the instructions from [the frontend repository](https://github.com/mohammad-naimur-rahman/bookworm-frontend)

If you find this project useful or interesting, don't forget to give a star to the repository! 🌟
Collaborators are also welcome to contribute and improve the project! 💗

🌟🤝 Happy book listing with Bookworm!
