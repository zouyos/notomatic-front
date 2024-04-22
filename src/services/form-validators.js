export class ValidatorService {
  static min(value, min) {
    if (value.length < min) return `Please type at least ${min} characters`;
  }

  static max(value, max) {
    if (value.length > max) return `Please type less than ${max} caractères`;
  }
}
