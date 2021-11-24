export const get = (req, res, db) => {
  console.log(db);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify([...db.values()]));
};
