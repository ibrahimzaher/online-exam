import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordReq, EditProfileReq } from '@izaher-dev/auth';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../auth/store/auth.reducer';
import { AccountFormsService } from '../forms/account-forms.service';
import { InputFieldComponent } from '../../../../../shared/ui/input-field/input-field.component';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { AuthPageActions } from '../../../../auth/store/auth.actions';
import { selectLoadingKey } from '../../../../../core/store/ui/ui.reducer';
import { changePasswordLoading } from '../../../../../core/store/ui/ui.constant';

@Component({
  selector: 'app-change-password',
  imports: [InputFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly accountFormsService = inject(AccountFormsService);
  changePasswordForm!: FormGroup<Record<keyof ChangePasswordReq, FormControl<string>>>;
  private readonly store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(changePasswordLoading));
  init() {
    this.changePasswordForm = this.accountFormsService.initChangePassword();
  }
  ngOnInit() {
    this.init();
  }
  get controls() {
    return this.changePasswordForm.controls;
  }
  changePassword() {
    console.log(this.changePasswordForm.value);

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      AuthPageActions.changePasswordSubmitted(this.changePasswordForm.getRawValue())
    );
  }
}
