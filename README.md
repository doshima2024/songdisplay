## Song Display

Song Display is a full-stack web app that displays Spotify songs using iframes. It also allows users to add and delete songs, and add ratings to songs, all via simple, styled UI. Songs and ratings are stored on the backend in a SQLite database.

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
- It displays spotify songs on mount from the backend using iframes
- Shows existing ratings for each song
- Allows users to add a song to the database, which updates directly in the UI
- Allows users to delete a song
- Allows users to leave a new rating on a song

## Getting Started

To run this project locally:

### Backend
- Open a terminal window and run the following commands:
- pipenv shell
- cd server 
- flask run

### Frontend
- Open a second terminal window and run the following command:
- npm run dev

Open the URL provided in the second terminal to view the app.

## Acknowledgements 

Special thanks to my Flatiron School instructors and my peers for their support on the learning journey that led me to build this project. It served as valuable practice and helped solidify my full stack skills: writing models with SQLalchemy and Python, creating backend routes with Flask, writing React components with state management and connecting the frontend and backend via fetch calls in React.


