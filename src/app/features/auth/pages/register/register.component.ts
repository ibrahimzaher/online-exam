import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest, RegisterUsecaseService } from '@izaher-dev/auth';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { finalize, tap } from 'rxjs';
import { ToasterService } from '../../../../core/services/toaster.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from '../../forms/auth-forms.service';
import { StorageService } from './../../../../core/services/storage.service';
import { formatPhoneNumber } from '../../../../shared/utils/phone.utils';

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
export class RegisterComponent {
  private readonly authforms = inject(AuthForms);
  registerForm = this.authforms.initRegisterForm();
  private readonly _router = inject(Router);
  private readonly _registerUsecaseService = inject(RegisterUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _storageService = inject(StorageService);
  private readonly _toasterService = inject(ToasterService);
  registerLoading = signal(false);
  get controls(): Record<keyof RegisterRequest, FormControl<string>> {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const cleanPhone = formatPhoneNumber(this.controls.phone.value);
    this.registerForm.patchValue({ phone: cleanPhone });
    this.registerLoading.set(true);
    this._registerUsecaseService
      .execute(this.registerForm.getRawValue())
      .pipe(
        tap((data) => this._toasterService.show(data.message)),
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.registerLoading.set(false))
      )
      .subscribe({
        next: (data) => {
          this._storageService.setItem<string>('token', data.token);
          this._router.navigate(['/dash'], { replaceUrl: true });
        },
      });
  }
}
