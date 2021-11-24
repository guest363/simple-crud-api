import { v4 as uuidv4 } from "uuid";

export const post = (req, res, db) => {
  const data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
    if (data.length > 1e6) {
      data.length = 0;
      res.writeHead(413, { "Content-Type": "text/plain" }).end();
      req.connection.destroy();
    }
  });

  req.on("end", function () {
    const body = Buffer.concat(data).toString();
    const parsedData = JSON.parse(body);
    console.log(parsedData);
    const id = uuidv4();
    const newPerson = { id, ...parsedData };
    db.set(id, newPerson);
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.end(JSON.stringify(newPerson));
  });
};
