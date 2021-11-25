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
  const parsedData = validatePost(req, res, body);
  const id = uuidv4();
  const extendedPerson = { id, ...parsedData };
  return { id, extendedPerson };
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
      const { id, extendedPerson } = getPerson(req, res, body);

      db.set(id, extendedPerson);
      res.writeHead(200, "OK", { "Content-Type": "text/plain" });
      res.end(JSON.stringify(extendedPerson));
    });
};
