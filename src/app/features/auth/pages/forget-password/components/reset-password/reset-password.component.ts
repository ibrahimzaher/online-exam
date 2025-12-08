import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { buttonResetLoading } from '../../../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../../../core/store/ui/ui.reducer';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from '../../../../forms/auth-forms.service';
import { selectForgetFlowEmail } from '../../../../store/auth.reducer';
import { AuthPageActions } from './../../../../store/auth.actions';

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
