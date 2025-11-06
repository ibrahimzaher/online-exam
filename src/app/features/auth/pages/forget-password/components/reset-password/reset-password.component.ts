import { Component, inject, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  ngOnInit(): void {
    this.resetForm = this._fb.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/),
          ],
        ],
        newPassword: [null, [Validators.required]],
      },
      {
        validators: this.misMatch,
      }
    );
  }
  misMatch(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('newPassword');

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
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  resetForm!: FormGroup;
  get password() {
    return this.resetForm.get('password') as FormControl;
  }
  get newPassword() {
    return this.resetForm.get('newPassword') as FormControl;
  }
  resetPassword() {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this._router.navigate(['/login']);
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
