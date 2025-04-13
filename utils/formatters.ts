export const toCamelCase = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));

export const transformKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = transformKeysToCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
