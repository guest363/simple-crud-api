import http from "http";
import { deleteWay } from "./api/delete.js";
import { get } from "./api/get.js";
import { post } from "./api/post.js";
import { purge } from "./api/purge.js";
import { put } from "./api/put.js";
import { dbSelector } from "./db/db-selector.js";

const personDb = dbSelector("in-memory");

export const router = (req, res) => {
  try {
    switch (req.method) {
      case "GET":
        return get(req, res, personDb);
      case "POST":
        return post(req, res, personDb);
      case "PUT":
        return put(req, res, personDb);
      case "DELETE":
        return deleteWay(req, res, personDb);
      case "PURGE":
        return purge(req, res, personDb);
      default:
        res
          .writeHead(404, { "Content-Type": "text/plain" })
          .end(`This method is not allow. ${http.STATUS_CODES[404]}`);
        break;
    }
  } catch (error) {
    res
      .writeHead(500, { "Content-Type": "text/plain" })
      .end(`Unexpexted error on route ${req.url}. ${http.STATUS_CODES[500]}`);
  }
};
