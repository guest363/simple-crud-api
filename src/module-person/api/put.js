import { isUUIDInUrl, personUrlReqExp } from "../../variables.js";
import { checkSize } from "../support/check-size.js";
import { getPerson } from "../support/get-peson.js";

export const put = (req, res, db) => {
  const searcheResult = personUrlReqExp.exec(req.url);
  const isCurrectPut = searcheResult[0] !== "/person";

  if (!isCurrectPut) {
    return res
      .writeHead(400, { "Content-Type": "text/plain" })
      .end("Put availeble on url /person/UUID");
  }
  if (!isUUIDInUrl.test(searcheResult[0])) {
    return res
      .writeHead(400, { "Content-Type": "text/plain" })
      .end("Put availeble on url /person/UUID, but you send invalid UUID");
  }

  const data = [];
  req
    .on("data", (chunk) => {
      data.push(chunk);
      checkSize(req, res, data);
    })
    .on("end", function () {
      const body = Buffer.concat(data).toString();
      const { id, person, errorMessage } = getPerson(body, searcheResult[0]);

      if (errorMessage) {
        return res.writeHead(400, { "Content-Type": "text/plain" }).end(person);
      }

      if (!db.has(id)) {
        return res
          .writeHead(404, { "Content-Type": "text/plain" })
          .end(`Have no person with id = ${id}`);
      }

      db.set(id, person);
      res.writeHead(200, "OK", { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    });
};
