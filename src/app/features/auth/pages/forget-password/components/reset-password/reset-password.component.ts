import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ResetPasswordUsecaseService } from '@izaher-dev/auth';
import { finalize, tap } from 'rxjs';
import { ToasterService } from '../../../../../../core/services/toaster.service';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from '../../../../forms/auth-forms.service';
import { StorageService } from './../../../../../../core/services/storage.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly _resetPasswordUsecaseService = inject(ResetPasswordUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toasterService = inject(ToasterService);
  private readonly _router = inject(Router);
  private readonly authForms = inject(AuthForms);
  private readonly _storageService = inject(StorageService);
  resetForm = this.authForms.initResetPasswrdForm();
  resetLoading = signal(false);
  verifyLoading = signal(false);
  email = input.required<string>();
  get controls() {
    return this.resetForm.controls;
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
        newPassword: this.controls.rePassword.value,
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
