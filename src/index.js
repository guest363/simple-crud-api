import dotenv from "dotenv";
import http from "http";
import { router } from "./module-person/router.js";
import { personUrlReqExp } from "./variables.js";
/**
 * Подгрудаем переменные окружения из файла .env
 */
dotenv.config();



http
  .createServer((req, res) => {
    switch (true) {
      /**
       * Все роуты начинающиеся на /person
       * передаются в ротуер person и он уже
       * их маршрутизирует
       */
      case personUrlReqExp.test(req.url):
        router(req, res);
        break;

      default:
        res.writeHead(404, { "Content-Type": "text/plain" }).end(
          JSON.stringify({
            data: `This route dose not exist - ${req.url}`,
          })
        );
        break;
    }
  })
  .listen(process.env.APP_PORT, "127.0.0.1", () => {
    console.log(
      `Сервер начал прослушивание запросов на порту ${process.env.APP_PORT}`
    );
  });
