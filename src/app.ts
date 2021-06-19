import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../.env`) });
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).send('Welcome to Movies API');
});

export default app;