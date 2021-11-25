import { isUUID, personUrlReqExp } from "../../variables.js";

export const get = (req, res, db) => {
  const searcheResult = personUrlReqExp.exec(req.url);
  const isGetAll = searcheResult[0] === "/person";
  /**
   * Либо возвращаем все знгачения Мапы
   * Либо берем по ID который будет в searcheResult[0]
   */
  const responsValue = isGetAll
    ? JSON.stringify([...db.values()])
    : db.get(searcheResult[0]);

  if (!isGetAll) {
    if (!isUUID.test(searcheResult[0])) {
      return res
        .writeHead(400, { "Content-Type": "application/json" })
        .end("Invalid uuid");
    }
    if (!responsValue) {
      return res
        .writeHead(404, { "Content-Type": "application/json" })
        .end("User not found");
    }
  }

  res
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify(responsValue));
};
