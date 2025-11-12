import { StorageService } from './../../../../core/services/storage.service';
import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';
import { matchFieldsValidator } from '../../../../shared/utils/validators.utils';
import { RegisterUsecaseService } from '@izaher-dev/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, tap } from 'rxjs';
import { ToasterService } from '../../../../core/services/toaster.service';

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
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _registerUsecaseService = inject(RegisterUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _storageService = inject(StorageService);
  private readonly _toasterService = inject(ToasterService);
  registerLoading = signal(false);

  ngOnInit(): void {
    this.registerForm = this._fb.group(
      {
        username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        firstName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/),
          ],
        ],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required,]],
      },
      {
        validators: matchFieldsValidator('password', 'rePassword'),
      }
    );
  }
  get username() {
    return this.registerForm.get('username') as FormControl;
  }
  get firstName() {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
  }
  get rePassword() {
    return this.registerForm.get('rePassword') as FormControl;
  }
  get phone() {
    return this.registerForm.get('phone') as FormControl;
  }

  register() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const phoneValue = this.phone.value;
    let cleanPhone = phoneValue.e164Number.replace(/\D/g, '');

    if (cleanPhone.startsWith('20')) {
      cleanPhone = '0' + cleanPhone.substring(2);
    }
    if (cleanPhone.length === 10 && cleanPhone.startsWith('1')) {
      cleanPhone = '0' + cleanPhone;
    }
    this.registerForm.patchValue({ phone: cleanPhone });

    this.registerLoading.set(true);
    this._registerUsecaseService
      .execute(this.registerForm.value)
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
