import app from './app';
import { initializeDatabase } from './database/db';
import { seed } from './database/seed';

const PORT = 8000;

initializeDatabase();
seed();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
