import { Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProfileReq } from '@izaher-dev/auth';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../shared/ui/input-field/input-field.component';
import { AuthPageActions } from '../../../../auth/store/auth.actions';
import { selectUser } from '../../../../auth/store/auth.reducer';
import { AccountFormsService } from '../forms/account-forms.service';
import { selectLoadingKey } from '../../../../../core/store/ui/ui.reducer';
import { deleteAccountLoading, editProfileLoading } from '../../../../../core/store/ui/ui.constant';
import { formatPhoneNumber } from '../../../../../shared/utils/phone.utils';

@Component({
  selector: 'app-profile',
  imports: [InputFieldComponent, ButtonComponent, ReactiveFormsModule, ConfirmDialog],
  providers: [ConfirmationService, MessageService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly accountFormsService = inject(AccountFormsService);
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);
  loadingEdit = this.store.selectSignal(selectLoadingKey(editProfileLoading));
  profileForm!: FormGroup<Record<keyof EditProfileReq, FormControl<string>>>;
  init() {
    this.profileForm = this.accountFormsService.initProfilerForm({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      username: '',
    });
  }
  constructor() {
    effect(() => {
      const user = this.user();
      if (user && this.profileForm) {
        this.profileForm?.patchValue({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          username: user.username,
        });
      }
    });
  }
  ngOnInit() {
    this.init();
  }
  get controls() {
    return this.profileForm.controls;
  }
  editProfile() {
    console.log(this.profileForm.value);
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const cleanPhone = formatPhoneNumber(this.controls.phone.value);
    this.profileForm.patchValue({ phone: cleanPhone });
    this.store.dispatch(AuthPageActions.editProfileSubmitted(this.profileForm.value));
  }
  private readonly confirmationService = inject(ConfirmationService);
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete your account?',
      header: 'Delete Account',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.store.dispatch(AuthPageActions.deleteAccountSubmitted());
      },
      reject: () => {},
    });
  }
}
