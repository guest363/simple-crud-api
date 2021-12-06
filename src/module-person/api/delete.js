import { isUUIDInUrl, personUrlReqExp } from "../../variables.js";

export const deleteWay = (req, res, db) => {
  const searcheResult = personUrlReqExp.exec(req.url);
  const id = searcheResult[0];
  const isCurrectPut = id !== "/person";

  if (!isCurrectPut) {
    return res
      .writeHead(400, { "Content-Type": "text/plain" })
      .end("Delete availeble on url /person/UUID");
  }
  if (!isUUIDInUrl.test(id)) {
    return res
      .writeHead(400, { "Content-Type": "text/plain" })
      .end("Delete availeble on url /person/UUID, but you send invalid UUID");
  }

  if (!db.has(id)) {
    return res
      .writeHead(404, { "Content-Type": "text/plain" })
      .end(`Have no person with id = ${id}`);
  }

  db.delete(id);
  res.writeHead(204).end();
};
