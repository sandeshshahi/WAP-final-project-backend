"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./database/db");
const seed_1 = require("./database/seed");
const PORT = 8000;
(0, db_1.initializeDatabase)();
(0, seed_1.seed)();
app_1.default.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
