// Argument helpers

export function failIfMissing(functionName, argumentName) {
  throw new Error(`Missing required argument [${argumentName}] from call to [${functionName}()]`)
}
