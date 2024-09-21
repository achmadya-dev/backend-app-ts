import express, { type Request, type Response, type Application } from "express";
import "dotenv/config";

const app: Application = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
