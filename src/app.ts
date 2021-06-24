import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../.env`) });
import express from 'express';
import movieRouter from './resources/movie/movie.router';

const app = express();

app.set('json spaces', 2);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/movie', movieRouter);

app.use('/', (req, res) => {
    res.status(200).send('Welcome to Movies API');
});

app.use((req, res) => {
    res.status(404).json({ error: '404 Page not found' });
});

app.use((error, req, res, next) => {
    const statusCode = error.code ? error.code : 500;
    res.status(statusCode).json({ error: error.message });
});

export default app;