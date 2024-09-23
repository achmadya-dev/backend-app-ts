import "dotenv/config";
import web from "./middleware";
import { RedisClient } from "./utils/redis";

const port: number = Number(process.env.PORT) || 3000;

RedisClient.on("connect", () => console.log(`redis running on ${process.env.REDIS_URL}`));

RedisClient.on("error", (error) => console.log(error));

const init = async () => {
    await RedisClient.connect();
    web.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

init();
