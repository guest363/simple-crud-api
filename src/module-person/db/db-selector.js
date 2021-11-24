import { createInMemoryDb } from "./create-in-memory.js";
/**
 * Default in-memory type
 *
 * API of all db must bee like native Map
 *
 * db.set(key, value) – записывает по ключу key значение value.
 *
 * db.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
 *
 * db.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
 *
 * db.delete(key) – удаляет элемент по ключу key.
 *
 * db.clear() – очищает коллекцию от всех элементов.
 *
 * db.size – возвращает текущее количество элементов.
 *
 * @param {string} dbType in-memory
 */
export const dbSelector = (dbType) => {
  switch (dbType) {
    case "in-memory":
      return createInMemoryDb();

    default:
      return createInMemoryDb();
  }
};
