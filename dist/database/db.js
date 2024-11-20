"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const dbPath = ':memory:';
const db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error('Error creating database: ', err);
    }
    else {
        console.log('In memory SQLite db server is initialized.');
    }
});
const initializeDatabase = () => {
    const schemaPath = path_1.default.resolve(__dirname, 'schema.sql');
    const schema = (0, fs_1.readFileSync)(schemaPath, 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database schema: ', err);
        }
        else {
            console.log('Database initialization completed.');
        }
    });
};
exports.initializeDatabase = initializeDatabase;
exports.default = db;
