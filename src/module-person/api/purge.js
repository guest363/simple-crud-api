/**
 * Метод для очистки базы, для тестировнаия
 */
export const purge = (req, res, db) => {
  db.clear();
  res.writeHead(200).end();
};
