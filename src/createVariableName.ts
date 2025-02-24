/**
 * @param {string} string - A string to convert to a variable name.
 * @returns {string} a string that is safe to use as variable name.
 */
export default function createVariableName(string: string): string {
  const variableName = string.replace(/[^0-9a-zA-Z_$]/g, "_");
  if (/^\d/.test(variableName)) {
    return `_${variableName}`;
  }
  return variableName;
}
