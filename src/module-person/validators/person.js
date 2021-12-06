import { v4 as uuidv4 } from "uuid";
import { isUUID } from "../../variables.js";
/**
 * Как валидируются различные типы
 */
const requireTypeList = {
  1: (value) => typeof value === "string",
  2: (value) => typeof value === "number",
  3: (value) =>
    Array.isArray(value) && value.every((field) => typeof field === "string"),
  4: (value) => isUUID.test(value),
};
/**
 * Поля и тип валидации
 * key, value
 */
const requireFields = [
  ["name", 1],
  ["age", 2],
  ["hobbies", 3],
  ["id", 4],
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
export const validatePerson = (body, id) => {
  let person = {};
  let unChekedData = {};
  let errorMessage = "";

  try {
    unChekedData = JSON.parse(body);
  } catch (error) {
    return { person, errorMessage: "Invalid JSON structure" };
  }

  for (let [key, value] of requireFields) {
    const hasProprty = Object.prototype.hasOwnProperty.call(unChekedData, key);
    /** Задать ID для PUT взятый из URL */
    if (!hasProprty && key === "id") {
      person[key] = id || uuidv4();
      continue;
    }
    const isCorrectType = requireTypeList[value](unChekedData[key]);
    if (!hasProprty || !isCorrectType) {
      return { person, errorMessage: `Invalid field ${key}` };
    }
    person[key] = unChekedData[key];
  }

  return { person, errorMessage };
};
