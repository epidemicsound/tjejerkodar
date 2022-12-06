# Tjejer Kodar x Epidemic Sound API Capture The Flag 🏳

Welcome to the Epidemic Sound Capture The Flag! This is a fun way to learn about the Epidemic Sound API and how to use it to create your own music player. The goal is to create a music player that can play music from Epidemic Sound. The player should be able to play, pause, skip, and go back to the previous song. The player should also be able to show the current song and artist. The player should also be able to show the current song's album art.

## The Challenge

Capture as many flags as you can! The flags could be hidden in the codebase, in the API endpoints, or in the browser inspection developer tools.

**🤘 Some tips:**

- The flags could look like this: `flag{this_is_a_flag}` or `fl🏳g` or `🏳` or something like this.
- If you find a flag, please submit it in [this Google form](https://forms.gle/uAZ3QmH2Gr4fNQHX6). You can submit as many flags as you find.
- If you find a flag, you will often be able to fix a bug. Fix the bug and then search for a new flag.
- If you find a flag, please don't share it with anyone else. We want everyone to have a fair chance to find all the flags.


## Getting Started

To get started, you will need your [Epidemic Sound Developer Portal](https://developers.epidemicsound.com/) credentials.

You will also need to install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).

Once you have Node.js and npm installed, you can move onto starting the backend, and then the frontend.


## Start the project

To start the project, you'll need to:

1. Start the backend server by running `npm start` in the `backend` folder.
2. Start the frontend server by running `npm dev` in the `frontend` folder.


### To start the frontend:

The `/frontend` folder is where you find the React frontend. To start the frontend, run the following commands:

1. Change into frontend directory: `cd frontend`
2. Install dependencies: `npm install` or use `yarn`
3. Run: `npm dev` or use `yarn dev`


### To start the backend:
Open a new terminal window.

1. Change into backend directory: `cd backend`
2. Install dependencies: `npm install` or use `yarn`
3. Run the backend: `npm dev` or use `yarn dev`

## API Documentation
You can find the documentation  for the API [here](https://partner-content-api-sandbox.epidemicsound.com/swagger).

Specifically, you will need to use the following endpoint:

`/collections/{id}`
