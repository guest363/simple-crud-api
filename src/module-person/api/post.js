import { v4 as uuidv4 } from "uuid";
import { validatePost } from "../validators/post.js";

const checkSize = (res, req, data) => {
  if (data.length > 1e6) {
    data.length = 0;
    res.writeHead(413, { "Content-Type": "text/plain" }).end();
    req.connection.destroy();
  }
};

const getPerson = (req, res, body) => {
  const { parsedData, errorMessage } = validatePost(req, res, body);
  if (errorMessage) return { errorMessage };
  const id = uuidv4();
  const extendedPerson = { id, ...parsedData };
  return { id, extendedPerson, errorMessage };
};

export const post = (req, res, db) => {
  const data = [];
  req
    .on("data", (chunk) => {
      data.push(chunk);
      checkSize(req, res, data);
    })
    .on("end", function () {
      const body = Buffer.concat(data).toString();
      const { id, extendedPerson, errorMessage } = getPerson(req, res, body);

      if (errorMessage) {
        return res
          .writeHead(400, { "Content-Type": "text/plain" })
          .end(errorMessage);
      }

      db.set(id, extendedPerson);
      res.writeHead(200, "OK", { "Content-Type": "text/plain" });
      res.end(JSON.stringify(extendedPerson));
    });
};
