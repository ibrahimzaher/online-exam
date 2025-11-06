import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    RouterLink,
    NgxIntlTelInputModule,
    ButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  ngOnInit(): void {
    this.registerForm = this._fb.group(
      {
        username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
        firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
        lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/),
          ],
        ],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required]],
      },
      {
        validators: this.misMatch,
      }
    );
  }
  get username() {
    return this.registerForm.get('username') as FormControl;
  }
  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get rePassword() {
    return this.registerForm.get('rePassword') as FormControl;
  }
  get phone() {
    return this.registerForm.get('phone') as FormControl;
  }

  misMatch(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) return null;

    if (password.value !== rePassword.value) {
      rePassword.setErrors({ ...(rePassword.errors || {}), mismatch: true });
      return { mismatch: true };
    } else {
      if (rePassword.hasError('mismatch')) {
        const { mismatch, ...otherErrors } = rePassword.errors || {};
        rePassword.setErrors(Object.keys(otherErrors).length ? otherErrors : null);
      }
      return null;
    }
  }
  register() {
    this.registerForm.valid
      ? console.log(this.registerForm.value)
      : this.registerForm.markAllAsTouched();
  }
}
