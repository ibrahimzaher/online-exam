import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const PASSWORD_PATTERN: RegExp = /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
export const MIN_LENGTH: number = 3;
export const MAX_LENGTH: number = 15;
export function matchFieldsValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) return null;

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({
        ...(matchingControl.errors || {}),
        mismatch: true,
      });
      return { mismatch: true };
    }

    if (matchingControl.hasError('mismatch')) {
      const { mismatch, ...otherErrors } = matchingControl.errors || {};
      matchingControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
    }

    return null;
  };
}
