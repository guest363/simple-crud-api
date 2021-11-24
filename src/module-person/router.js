import http from "http";
import { dbSelector } from "./db/db-selector.js";

const personDb = dbSelector("in-memory");

export const router = (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: `This method is not allow. ${http.STATUS_CODES[404]}`,
        })
      );

      break;
  }
};
