import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { LoginUsecaseService, LoginRequest } from '@izaher-dev/auth';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { finalize, tap } from 'rxjs';
import { StorageService } from '../../../../core/services/storage.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from '../../forms/auth-forms.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ButtonModule,
    RouterLink,
    InputFieldComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _loginUseCase = inject(LoginUsecaseService);
  private readonly _storage = inject(StorageService);
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToasterService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly authForms = inject(AuthForms);
  loginLoading = signal(false);
  loginForm = this.authForms.initLoginForm();
  get controls(): Record<keyof LoginRequest, FormControl<string>> {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginLoading.set(true);
    this._loginUseCase
      .execute(this.loginForm.getRawValue())
      .pipe(
        tap((data) => {
          this._toaster.show(data.message, true);
        }),
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.loginLoading.set(false))
      )
      .subscribe({
        next: (data) => {
          this._storage.setItem<string>('token', data.token);
          this._router.navigate(['/dash'], { replaceUrl: true });
        },
        error: (err) => console.log(err),
      });
  }
}
