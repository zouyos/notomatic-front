export class ValidatorService {
  static min(value, min) {
    if (value.length < min)
      return `Veillez entrer au minimum ${min} caractères`;
  }

  static max(value, max) {
    if (value.length > max)
      return `Vous ne pouvez pas dépasser ${max} caractères`;
  }
}
