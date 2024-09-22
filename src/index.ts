import "dotenv/config";
import web from "./middleware";

const port: number = Number(process.env.PORT) || 3000;

web.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
