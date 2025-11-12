import { StorageService } from './../../../../../../core/services/storage.service';
import { Component, DestroyRef, inject, Input, input, OnInit, signal } from '@angular/core';
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
import { ResetPasswordUsecaseService } from '@izaher-dev/auth';
import { ToasterService } from '../../../../../../core/services/toaster.service';
import { finalize, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  private readonly _resetPasswordUsecaseService = inject(ResetPasswordUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toasterService = inject(ToasterService);
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  private readonly _storageService = inject(StorageService);
  resetForm!: FormGroup;
  resetLoading = signal(false);
  verifyLoading = signal(false);
  email = input.required<string>();
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

  get password() {
    return this.resetForm.get('password') as FormControl;
  }
  get newPassword() {
    return this.resetForm.get('newPassword') as FormControl;
  }
  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    console.log(this.email);

    this.resetLoading.set(true);
    this._resetPasswordUsecaseService
      .execute({
        email: this.email(),
        newPassword: this.newPassword.value,
      })
      .pipe(
        tap((data) => this._toasterService.show(data.message)),
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.resetLoading.set(false))
      )
      .subscribe({
        next: (data) => {
          this._storageService.setItem('token', data.token);
          this._router.navigate(['/dash'], { replaceUrl: true });
        },
      });
  }
}
