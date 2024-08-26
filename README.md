# Blog-Sphere

Blog-Sphere is a full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js) and styled using Tailwind CSS. This application allows users to create, read, update, and delete blog posts, providing a user-friendly interface and seamless experience for managing content.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (sign up, log in, log out)
- Create, read, update, and delete blog posts
- Rich text editor for creating and editing blog content
- Responsive design with Tailwind CSS
- Optimized for performance and scalability
- Error handling and form validation

## Technologies Used

- **Frontend**:
  - React
  - TypeScript
  - Axios
  - Tailwind CSS
  - React Avatar (for user avatars)
  - React Icons (for icons)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (via Mongoose)

- **Miscellaneous**:
  - JWT for authentication
  - ESLint and Prettier for code formatting
  - Git for version control

## Project Structure

The project is organized as follows:

blog-sphere/ │ ├── client/ # Frontend code │ ├── src/ │ │ ├── components/ # Reusable components │ │ ├── pages/ # Pages for routing │ │ ├── App.tsx # Main application file │ │ └── index.tsx # Entry point for React │ ├── public/ # Static assets │ └── tailwind.config.js # Tailwind CSS configuration │ ├── server/ # Backend code │ ├── controllers/ # Controllers for handling requests │ ├── models/ # Mongoose models │ ├── routes/ # API routes │ ├── middleware/ # Express middleware │ ├── server.ts # Entry point for the server │ └── config/ # Configuration files │ ├── .env # Environment variables ├── .gitignore # Git ignore file ├── package.json # Project dependencies ├── README.md # Project documentation └── tsconfig.json # TypeScript configuration



## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [MongoDB](https://www.mongodb.com/) (either locally installed or a cloud instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/uTkarsH001/blog-sphere.git
cd blog-sphere
```

2. Install the dependencies for both the frontend and backend:

 ```bash
npm install
cd client
npm install
```

3. Create a .env file in the root directory with the following variables:

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```bash
npm run dev
```




