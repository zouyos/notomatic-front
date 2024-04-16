export class ValidatorService {
  static min(value, min) {
    if (value.length < min) return `Please type at least ${min} characters`;
  }

  static max(value, max) {
    if (value.length > max) return `You can't type more than ${max} characters`;
  }

  static emailRegex(value) {
    const regex = /@/;
    if (!regex.test(value)) {
      return "Please type a valid email format";
    }
  }

  static passwordRegex(value) {
    const regex = /^(?=.*[A-Z])[A-Za-z0-9]+$/;
    if (!regex.test(value)) {
      return "Only letters (at least one in uppercase) and numbers are allowed";
    }
  }

  static notSame(valueA, valueB) {
    if (valueA !== valueB) {
      return "Passwords should match";
    }
  }
}
