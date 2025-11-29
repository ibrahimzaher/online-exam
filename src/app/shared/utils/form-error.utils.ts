export function getErrorMessage(
  key: string,
  value: any,
  options?: { label?: string; type?: string; otp?: boolean }
): string {
  const label = options?.label ?? 'Field';
  const type = options?.type ?? 'text';

  switch (key) {
    case 'required':
      return `${label} is required`;

    case 'minlength':
      if (type === 'otp') {
        return `OTP must be at most ${value.requiredLength} digits`;
      }
      return `Minimum length is ${value.requiredLength} characters`;

    case 'maxlength':
      return `Maximum length is ${value.requiredLength} characters`;

    case 'mismatch':
      return 'Password does not match';

    case 'pattern':
      if (type === 'password') {
        return 'Password must contain uppercase, lowercase, number, and special character';
      }
      return `Invalid ${label}`;

    case 'email':
      return 'Invalid email format';

    case 'validatePhoneNumber':
      return 'Invalid phone number';

    default:
      return 'Invalid field';
  }
}
