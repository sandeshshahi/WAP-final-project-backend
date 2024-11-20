import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import path from 'path';

const dbPath = ':memory:';

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error creating database: ', err);
    } else {
        console.log('In memory SQLite db server is initialized.');
    }
});

export const initializeDatabase = () => {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database schema: ', err);
        } else {
            console.log('Database initialization completed.');
        }
    });
};

export default db;