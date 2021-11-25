import http from "http";
import { get } from "./api/get.js";
import { post } from "./api/post.js";
import { dbSelector } from "./db/db-selector.js";

const personDb = dbSelector("in-memory");

export const router = (req, res) => {
  switch (req.method) {
    case "GET":
      return get(req, res, personDb);
    case "POST":
      return post(req, res, personDb);
    case "PUT":
      break;
    case "DELETE":
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" }).end(
        JSON.stringify({
          data: `This method is not allow. ${http.STATUS_CODES[404]}`,
        })
      );
      req.connection.destroy();
      break;
  }
};
