import dotenv from 'dotenv'
import app from './src/app.js'
import connectToDB from './src/config/db.js'

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
// app.listen('3000', () => {
//     console.log('Server running on port 3000')
// })