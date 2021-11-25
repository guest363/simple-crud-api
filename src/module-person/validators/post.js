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
 * В задании не совсем ясно, что делать если есть лишниее поля
 * я решил просто их игнорировать, не бросать ошибку
 *
 * И по этой причине
 * {"name": "Oleg", "age": 12, "hobbies": ["sd"], "ds": 12}
 * Станет
 * {"id":"0fabff81-3cad-42f7-8da0-4080217be27a","name":"Oleg","age":12,"hobbies":["sd"]}
 *
 * @param {*} res http.response
 * @param {*} req http.request
 * @param {*} body JSON in string
 * @returns parsed Person object
 */
export const validatePost = (req, res, body) => {
  let parsedData = {};
  let unChekedData = {};
  let errorMessage = "";

  try {
    unChekedData = JSON.parse(body);
  } catch (error) {
    return { parsedData, errorMessage: "Invalid JSON structure" };
  }

  for (let [key, value] of requireFields) {
    const hasProprty = Object.prototype.hasOwnProperty.call(unChekedData, key);
    const isCorrectType = requireTypeList[value](unChekedData[key]);
    if (!hasProprty || !isCorrectType) {
      return { parsedData, errorMessage: `Invalid field ${key}` };
    }
    parsedData[key] = unChekedData[key];
  }

  return { parsedData, errorMessage };
};
