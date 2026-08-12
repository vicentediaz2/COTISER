export const passwordRequirements = [
  { key: "length", label: "Mínimo 10 caracteres.", test: (password: string) => password.length >= 10 },
  { key: "uppercase", label: "Al menos una mayúscula.", test: (password: string) => /\p{Lu}/u.test(password) },
  { key: "number", label: "Al menos un número.", test: (password: string) => /\p{N}/u.test(password) },
  { key: "symbol", label: "Al menos un símbolo.", test: (password: string) => /[^\p{L}\p{N}]/u.test(password) },
] as const;

export function isValidPassword(password: string) {
  return passwordRequirements.every(({ test }) => test(password));
}
