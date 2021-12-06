import { validatePerson } from "../validators/person.js";

/**
 * Возвращает либо { errorMessage } либо { person.id, person, errorMessage }
 * @param {*} req
 * @param {*} res
 * @param {*} body
 * @returns
 */
export const getPerson = (body, id) => {
  const { person, errorMessage } = validatePerson(body, id);
  if (errorMessage) return { errorMessage };

  return { id: person.id, person, errorMessage };
};
