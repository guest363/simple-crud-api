import dotenv from "dotenv";
import http from "http";
/**
 * Подгрудаем переменные окружения из файла .env
 */
dotenv.config();

let message = "Hello World!";
http
  .createServer(function (request, response) {
    console.log(message);
    response.end(message);
  })
  .listen(process.env.APP_PORT, "127.0.0.1", () => {
    console.log("Сервер начал прослушивание запросов");
  });
