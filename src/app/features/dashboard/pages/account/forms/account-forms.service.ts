import { EditProfileReq } from './../../../../../../../projects/auth/src/lib/data/dto/auth-req';
import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ChangePasswordReq } from '@izaher-dev/auth';
import {
  matchFieldsValidator,
  MAX_LENGTH,
  MIN_LENGTH,
  PASSWORD_PATTERN,
} from '../../../../../shared/utils/validators.utils';

@Injectable({
  providedIn: 'root',
})
export class AccountFormsService {
  private readonly fb = inject(NonNullableFormBuilder);
  initProfilerForm(
    data: EditProfileReq
  ): FormGroup<Record<keyof EditProfileReq, FormControl<string>>> {
    return this.fb.group({
      username: this.fb.control(data.username!, {
        validators: [
          Validators.required,
          Validators.minLength(MIN_LENGTH),
          Validators.maxLength(MAX_LENGTH),
        ],
      }),

      firstName: this.fb.control(data.firstName!, {
        validators: [
          Validators.required,
          Validators.minLength(MIN_LENGTH),
          Validators.maxLength(MAX_LENGTH),
        ],
      }),
      lastName: this.fb.control(data.lastName!, {
        validators: [
          Validators.required,
          Validators.minLength(MIN_LENGTH),
          Validators.maxLength(MAX_LENGTH),
        ],
      }),
      email: this.fb.control(data.email!, {
        validators: [Validators.required, Validators.email],
      }),

      phone: this.fb.control(data.phone!, {
        validators: [Validators.required],
      }),
    });
  }
  initChangePassword(): FormGroup<Record<keyof ChangePasswordReq, FormControl<string>>> {
    return this.fb.group(
      {
        oldPassword: this.fb.control('', {
          validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
        }),
        password: this.fb.control('', {
          validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
        }),
        rePassword: this.fb.control('', {
          validators: [Validators.required, Validators.pattern(PASSWORD_PATTERN)],
        }),
      },
      {
        validators: matchFieldsValidator('password', 'rePassword'),
      }
    );
  }
}
