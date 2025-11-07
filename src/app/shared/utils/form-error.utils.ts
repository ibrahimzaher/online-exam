export function getErrorMessage(
  key: string,
  value: any,
  options?: { label?: string; type?: string; otp?: boolean }
): string {
  const label = options?.label ?? 'Field';
  const type = options?.type ?? 'text';
  const otp = options?.otp ?? false;

  switch (key) {
    case 'required':
      return otp ? '' : `${label} is required`;
    case 'minlength':
      return `Minimum length is ${value.requiredLength} characters`;
    case 'maxlength':
      return `Maximum length is ${value.requiredLength} characters`;
    case 'mismatch':
      return 'Password does not match';
    case 'pattern':
      return type === 'password'
        ? 'Password must contain uppercase, lowercase, number, and special character'
        : otp
        ? 'Inv'
        : `Invalid ${label}`;
    case 'email':
      return 'Invalid email format';
    case 'validatePhoneNumber':
      return 'Invalid phone number';
    default:
      return 'Invalid field';
  }
}
