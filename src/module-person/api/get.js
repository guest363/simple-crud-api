export const get = (req, res, db) => {
  console.log(db);
  res
    .writeHead(200, { "Content-Type": "application/json" })
    .end(JSON.stringify([...db.values()]));
};
