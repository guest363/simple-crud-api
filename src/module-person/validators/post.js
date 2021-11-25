/**
 * Как валидируются различные типы
 */
const requireTypeList = {
  1: (value) => typeof value === "string",
  2: (value) => typeof value === "number",
  3: (value) =>
    Array.isArray(value) && value.every((field) => typeof field === "string"),
};
/**
 * Поля и тип валидации
 */
const requireFields = [
  ["name", 1],
  ["age", 2],
  ["hobbies", 3],
];

/**
 * Валидирует и парсит Person
 *
 * Возвращает распарсенные данные и ошибку
 *
 * @param {*} res http.response
 * @param {*} req http.request
 * @param {*} body JSON in string
 * @returns parsed Person object
 */
export const validatePost = (req, res, body) => {
  let parsedData = {};
  let errorMessage = "";

  try {
    parsedData = JSON.parse(body);
  } catch (error) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end("Invalid JSON");
    req.connection.destroy();
  }
  try {
    for (let [key, value] of requireFields) {
      const hasProprty = Object.prototype.hasOwnProperty.call(parsedData, key);
      console.log(value);
      const isCorrectType = requireTypeList[value](parsedData[key]);
      if (!hasProprty || !isCorrectType) {
        throw new Error(`Invalid field ${key}`);
      }
    }
  } catch (error) {
    errorMessage = error.message;
  }

  return { parsedData, errorMessage };
};
