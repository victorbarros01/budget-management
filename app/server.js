import dotenv from 'dotenv';
import path from 'path';

import app from './src/app.js';

const PORT = process.env.PORT;
const link = `http://localhost:${PORT}`;

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!PORT) {
    throw new Error(`PORT is not defined in .env file ${link}`);
}

app.listen(PORT, () => {
    console.log(`Server is running on ${link}`);
});
