/**
 * Как валидируются различные типы
 */
const requireTypeList = {
  1: (value) => typeof value === "string",
  2: (value) =>
    Array.isArray(value) && value.every((field) => typeof field === "string"),
};
/**
 * Поля и тип валидации
 */
const requireFields = [{ name: 1 }, { age: 1 }, { hobbies: 2 }];

/**
 * Валидирует и парсит Person
 *
 * @param {*} res http.response
 * @param {*} req http.request
 * @param {*} body JSON in string
 * @returns parsed Person object
 */
export const validatePost = (res, req, body) => {
  let parsedData = {};
  try {
    parsedData = JSON.parse(body);
  } catch (error) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end("Invalid JSON");
    req.connection.destroy();
  }
  try {
    for (let { key, value } in [...requireFields.entries()]) {
      const hasProprty = Object.prototype.hasOwnProperty.call(parsedData, key);
      const isCorrectType = requireTypeList[value](parsedData[key]);
      if (!hasProprty || !isCorrectType) {
        throw new Error(`Invalid field ${key}`);
      }
    }
  } catch (error) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end("Invalid JSON");
    req.connection.destroy();
  }

  return parsedData;
};
