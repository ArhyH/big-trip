export default class AdapterService {
  #toSnakeCase(string) {
    return string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  #toCamelCase(string) {
    return string.replace(/_([A-z])/g, (_, letter) => letter.toUpperCase());
  }

  #convertKeys(object, convertFunction) {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => [
        convertFunction(key),
        value,
      ]),
    );
  }

  #objectToSnakeCase(object) {
    return this.#convertKeys(object, this.#toSnakeCase);
  }

  #objectToCamelCase(object) {
    return this.#convertKeys(object, this.#toCamelCase);
  }

  adaptToServer(object) {
    return this.#objectToSnakeCase(object);
  }

  adaptToClient(object) {
    return this.#objectToCamelCase(object);
  }
}
