# BrainerHub - Full-Stack Web Application

BrainerHub is a full-stack web application that allows users to register, login, manage products, and view product listings. It is built using MERN stack (MongoDB, Express, React, and Node.js) and uses Chakra UI for the user interface.

## Features

- User Registration: Users can register on the platform by providing a unique username and password.

- User Login: Registered users can log in using their credentials to access their accounts.

- Product Creation: Logged-in users can create new products with details such as name, price, description, quantity, and an image url.

- Product Listing: Users can view a list of products available on the platform. The listing supports search, sort, and pagination.


## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (Make sure it's running)

## Getting Started

1. Clone the repository:
    git clone https://github.com/NehaP0/BrainerHub.git
2. Install dependencies for both the frontend and backend:
    cd Backend
    npm install
    cd frontend
    npm install

3. Environment Configuration:
    Create a `.env` file in the Backend directory with the following content:

    PORT=5000
    MONGO_URL=your_mongodb_connection_string

Replace `your_mongodb_connection_string` with the connection URL of your MongoDB database.

4. Start the application:
    cd frontend
    npm start


## Deployed Links:
 ## Frontend : https://64c1f1d5d36fab434fdbc83c--lovely-frangollo-f3ca3e.netlify.app/
 ## Backend : https://brainer-xecs.onrender.com


## Acknowledgments

- The full-stack application is built using the MERN stack (MongoDB, Express, React, and Node.js).
- Chakra UI is used for the user interface, making it visually appealing and responsive.



