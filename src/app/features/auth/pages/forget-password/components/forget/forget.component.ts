import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgetPasswordReq } from '@izaher-dev/auth';
import { Store } from '@ngrx/store';
import { buttonForgetLoading } from '../../../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../../../core/store/ui/ui.reducer';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from '../../../../forms/auth-forms.service';
import { AuthPageActions } from '../../../../store/auth.actions';

@Component({
  selector: 'app-forget',
  imports: [InputFieldComponent, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  private readonly authForms = inject(AuthForms);
  private readonly store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(buttonForgetLoading));
  forgetForm = this.authForms.initForgetPasswordForm();
  get controls(): Record<keyof ForgetPasswordReq, FormControl<string>> {
    return this.forgetForm.controls;
  }
  continue() {
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      AuthPageActions.forgetPasswordSubmitted({ email: this.forgetForm.controls.email.value })
    );
  }
}
