import dotenv from "dotenv";
import http from "http";
import { router } from "./module-person/router.js";
/**
 * Подгрудаем переменные окружения из файла .env
 */
dotenv.config();

http.createServer(router).listen(process.env.APP_PORT, "127.0.0.1", () => {
  console.log(
    `Сервер начал прослушивание запросов на порту ${process.env.APP_PORT}`
  );
});
