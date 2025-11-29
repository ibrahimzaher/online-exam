import { inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import {
  matchFieldsValidator,
  MAX_LENGTH,
  MIN_LENGTH,
  PASSWORD_PATTERN,
} from '../../../shared/utils/validators.utils';
import {
  ForgetPasswordReq,
  LoginRequest,
  RegisterRequest,
  ResetPasswordReq,
  VerifyResetCodeReq,
} from '@izaher-dev/auth';
@Injectable({ providedIn: 'root' })
export class AuthForms {
  private readonly fb = inject(NonNullableFormBuilder);
  initLoginForm(): FormGroup<Record<keyof LoginRequest, FormControl<string>>> {
    return this.fb.group({
      email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
      password: this.fb.control<string>('', {
        validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
      }),
    });
  }
  initRegisterForm(): FormGroup<Record<keyof RegisterRequest, FormControl<string>>> {
    return this.fb.group(
      {
        username: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(MIN_LENGTH),
            Validators.maxLength(MAX_LENGTH),
          ],
        }),
        firstName: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(MIN_LENGTH),
            Validators.maxLength(MAX_LENGTH),
          ],
        }),
        lastName: this.fb.control('', {
          validators: [
            Validators.required,
            Validators.minLength(MIN_LENGTH),
            Validators.maxLength(MAX_LENGTH),
          ],
        }),
        email: this.fb.control('', {
          validators: [Validators.required, Validators.email],
        }),
        password: this.fb.control('', {
          validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
        }),
        rePassword: this.fb.control('', {
          validators: [Validators.required],
        }),
        phone: this.fb.control('', {
          validators: [Validators.required],
        }),
      },
      {
        validators: matchFieldsValidator('password', 'rePassword'),
      }
    );
  }
  initForgetPasswordForm(): FormGroup<Record<keyof ForgetPasswordReq, FormControl<string>>> {
    return this.fb.group({
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    });
  }
  initVerifyCoderForm(): FormGroup<Record<keyof VerifyResetCodeReq, FormControl<string>>> {
    return this.fb.group({
      resetCode: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }
  initResetPasswrdForm(): FormGroup<
    Record<keyof { password: string; rePassword: string }, FormControl<string>>
  > {
    return this.fb.group(
      {
        password: this.fb.control('', {
          validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
        }),
        rePassword: this.fb.control('', {
          validators: [Validators.required],
        }),
      },
      {
        validators: matchFieldsValidator('password', 'rePassword'),
      }
    );
  }
}
