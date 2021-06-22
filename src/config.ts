import path from 'path';

export const DB_FILE = process.cwd() + path.resolve(__dirname, "../", process.env.DB_FILE_PATH);