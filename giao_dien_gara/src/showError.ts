export function showError(error: unknown) {
  alert(error instanceof Error ? error.message : String(error))
}
