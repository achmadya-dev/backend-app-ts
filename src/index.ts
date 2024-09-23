import "dotenv/config";
import web from "./middleware";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { RedisClient } from "./utils/redis";
import { options } from "./utils/swagger";

const port: number = Number(process.env.PORT) || 3000;

const specs = swaggerJsDoc(options);

web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

RedisClient.on("connect", () => console.log(`redis running on ${process.env.REDIS_URL}`));

RedisClient.on("error", (error) => console.log(error));

const init = async () => {
    await RedisClient.connect();
    web.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

init();
