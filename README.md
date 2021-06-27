# Movies API

Simple movies API that enables user to get movies list by certain parameters, or add movies.

It is single user only, meaning no authentication, authorization or account creation is necessary.

### Things it can do

-   create and add a new movie to a database;
-   get random movie;
-   get movies by genres/duration time/genres and duration time

# Live
You can check how the app works here: https://simple-movies-api.herokuapp.com/

# Dependencies

To run this project, it is necessary to:

-   have _Node.js_ installed

# Setup

If you'd like to download the code and launch it yourself, here's what you need to do:

#### 1. Install dependencies

    npm install

#### 2. Add _.env_ file at the root directory with the following info:

    DB_FILE_PATH=
    PORT=

The database file path should be specified relatively to the _/src_ folder

**Example** (you can actually copy and paste it):

    DB_FILE_PATH=./database/db.json
    PORT=3000

#### 3. Build and run

    npm run start

#### 4. Run tests (optional)

    npm run test

# Usage

## Open endpoints

Open endpoints require no Authentication.

-   [Get a random movie](docs/GetRandomMovie.md): `GET /api/movie/`
-   [Get movies by duration](docs/GetByDuration.md): `GET /api/movie/:durationFrom/:durationTo`
-   [Get movies by genres](docs/GetByGenres.md): `GET /api/movie/:genres`
-   [Get movies by genres and duration](docs/GetByGenresAndDuration.md): `GET /api/movie/:genres/:durationFrom/:durationTo`
-   [Create movie](docs/CreateMovie.md): `POST /api/movie/`

# My Thoughts and Concerns

1. I didn't prepare my API to prevent addition of movies with identical data. I thought about it, and I am well aware of this issue.
2. I'd be happy to use Nest.js with Typescript here, but I've decided to stick with requirements.
3. I didn't use any library that helps with JSON databases, as I think showing my own way of writing some logic is important here.
