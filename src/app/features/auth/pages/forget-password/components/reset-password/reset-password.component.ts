import { AuthPageActions } from './../../../../store/auth.actions';
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
import { Store } from '@ngrx/store';
import { selectLoadingKey } from '../../../../../../core/store/ui/ui.reducer';
import { buttonResetLoading } from '../../../../../../core/store/ui/ui.constant';
import { selectForgetFlowEmail } from '../../../../store/auth.reducer';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(buttonResetLoading));
  email = this.store.selectSignal(selectForgetFlowEmail);
  private readonly authForms = inject(AuthForms);
  resetForm = this.authForms.initResetPasswrdForm();
  get controls() {
    return this.resetForm.controls;
  }
  resetPassword() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      AuthPageActions.resetPasswordSubmitted({
        email: this.email()!,
        newPassword: this.controls.rePassword.value,
      })
    );
  }
}
