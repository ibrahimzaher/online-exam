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
import { Store } from '@ngrx/store';
import { selectLoadingKey } from '../../../../core/store/ui/ui.reducer';
import { buttonLoginLoading } from '../../../../core/store/ui/ui.constant';
import { AuthPageActions } from '../../store/auth.actions';

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
  private readonly store = inject(Store);
  private readonly authForms = inject(AuthForms);
  loading = this.store.selectSignal(selectLoadingKey(buttonLoginLoading));
  loginForm = this.authForms.initLoginForm();
  get controls(): Record<keyof LoginRequest, FormControl<string>> {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(AuthPageActions.loginSubmitted(this.loginForm.getRawValue()));
  }
}
