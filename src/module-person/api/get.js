import { personUrlReqExp } from "../../variables.js";

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

  res.writeHead(200, { "Content-Type": "application/json" }).end(responsValue);
};
