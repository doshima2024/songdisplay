## Song Display

Song Display is a full-stack web app that displays Spotify songs using iframes. It also allows users to add and delete songs, and add ratings to songs, all via simple, styled UI. Songs and ratings are stored on the backend in a SQLite database. This project was built to practice and solidify my full stack development skills using the stack below, and to showcase my passion for music related technologies and tools.

## Tech Stack
- **Frontend** 
- React 
- JavaScript 
- Vite
- Tailwind (styling)
- **Backend**
- Python (Flask)
- SQLAlchemy (ORM)
- SQLite 

## Features

Song Display includes the following features:
- Displays spotify songs from the backend on mount using iframes
- Shows existing ratings for each song
- Allows users to add a song to the database, which updates directly in the UI
- Allows users to delete a song
- Allows users to leave a new rating on a song
- Styled simply using Tailwind

## Getting Started

To run this project locally:

### Backend
- Open a terminal window and run the following commands:
- cd server 
- pipenv shell
- pipenv install
- flask run

### Frontend
- Open a second terminal window and run the following commands:
- npm install
- npm run dev

Open the URL provided in the second terminal to view the app.

## Acknowledgements 

Special thanks to my Flatiron School instructors and my peers for their support on the learning journey that led me to build this project. It served as valuable practice and helped solidify my full stack skills: writing models with SQLalchemy and Python, creating backend routes with Flask, writing React components with state management and connecting the frontend and backend via fetch calls in React.


