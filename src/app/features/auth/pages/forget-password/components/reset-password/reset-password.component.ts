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
import { matchFieldsValidator } from '../../../../../../shared/utils/validators.utils';

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
        validators: matchFieldsValidator('password', 'newPassword'),
      }
    );
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
