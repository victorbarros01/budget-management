import 'dotenv/config';

import app from './src/app.js';

const PORT = process.env.PORT;
const link = `http://localhost:${PORT}`;



if (!PORT) {
    throw new Error(`PORT is not defined in .env file ${link}`);
}

app.listen(PORT, () => {
    console.log(`Server is running on ${link}`);
});
