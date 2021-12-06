import { personUrlReqExp } from "../../variables.js";
import { checkSize } from "../support/check-size.js";
import { getPerson } from "../support/get-peson.js";

export const post = (req, res, db) => {
  const searcheResult = personUrlReqExp.exec(req.url);
  const isCurrectPost = searcheResult[0] === "/person";

  if (!isCurrectPost) {
    return res
      .writeHead(400, { "Content-Type": "text/plain" })
      .end("Post availeble on url /person");
  }

  const data = [];
  req
    .on("data", (chunk) => {
      data.push(chunk);
      checkSize(req, res, data);
    })
    .on("end", function () {
      const body = Buffer.concat(data).toString();
      const { id, person, errorMessage } = getPerson(body);

      if (errorMessage) {
        return res
          .writeHead(400, { "Content-Type": "text/plain" })
          .end(errorMessage);
      }

      db.set(id, person);
      res.writeHead(200, "OK", { "Content-Type": "application/json" });
      res.end(JSON.stringify(person));
    });
};
