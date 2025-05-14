## Song Display and Rating App

Song Display is a full-stack web app that displays Spotify songs using iframes. It also allows users to add and delete songs, and add ratings to songs, all via simple, styled UI. Songs and ratings are stored on the backend in a PostgreSQL database. This project was built to practice and solidify my full stack development skills using the stack below, and to showcase my passion for music related technologies and tools.

## Current Version (v1.0)

The current stable version of the app includes the following features:
- Add and display songs using Spotify embeds
- Rate songs
- Store data in a PostgreSQL database

## In Progress: User Authentication Feature

A new `authentication` branch is under active development to add user authentication to the app, including:
- User registration with hashed passwords
- User login and session management
- Protected routes for adding ratings

## Branch Information

The stable version (v1.0) without authentication features is available on the main branch:
-git checkout main

The in-progress version with user authentication features is being developed on the authentication branch:
-git checkout authentication

## Tech Stack
- **Frontend** 
- React 
- JavaScript 
- Vite
- Tailwind (styling)
- **Backend**
- Python (Flask)
- SQLAlchemy (ORM)
- PostgreSQL

## Features

Song Display includes the following features:
- Displays spotify songs from the backend on mount using iframes
- Shows existing ratings for each song
- Allows users to add a song to the database, which updates directly in the UI
- Allows users to delete a song
- Allows users to leave a new rating on a song
- Styled simply using Tailwind

## Getting Started

### Prerequisites
Before running the project locally, ensure you have the following installed:
- Python 3.8+ - Backend development and running Flask
- PostgreSQL 14+ - Database management and storage
- Node.js and npm - Required for running Vite and managing frontend dependencies
- pipenv - Virtual environment management for Python

To run this project locally:

### Backend Setup
- 1. Open a terminal window and navigate to the server folder:
- cd server
- 2. Create a .env file in the root directory and add the following line, replacing with your actual PostgreSQL credentials for username and password:

DATABASE_URL=postgresql://username:password@localhost:5432/songdisplaydb

- 3. Run the following commands to set up the backend:
- pipenv shell
- pipenv install
- flask db init
- flask db migrate -m "Initial migration"
- flask db upgrade
- flask run

### Frontend Setup
- Open a second terminal window and navigate to the root folder, then run the following commands:
- npm install
- npm run dev

Open the URL provided in the second terminal to view the app.

### Demo

Check out a live demo of the app here on Loom: [Watch The Demo](https://www.loom.com/share/da35c451fc7946dba929ef802b5eb2a4)

## Acknowledgements 

Special thanks to my Flatiron School instructors and peers for their guidance and support throughout this project. It served as valuable practice, not only in solidifying my full stack skills — from writing models with SQLAlchemy and Python, creating backend routes with Flask, and managing state in React — but also in expanding my experience with PostgreSQL databases.


