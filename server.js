import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bugController from './controllers/bug.controller.js';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.static("./dist"))
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))

app.use("/api/bugs", bugController);

app.use('*', (_, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});