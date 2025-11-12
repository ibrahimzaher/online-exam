import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/ui/input-field/input-field.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { LoginUsecaseService } from '@izaher-dev/auth';
import { StorageService } from '../../../../core/services/storage.service';
import { ToasterService } from '../../../../core/services/toaster.service';
import { catchError, finalize, of, tap } from 'rxjs';

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
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/),
        ],
      ],
    });
  }
  private readonly _fb = inject(FormBuilder);
  private readonly _loginUseCase = inject(LoginUsecaseService);
  private readonly _storage = inject(StorageService);
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToasterService);
  private readonly _destroyRef = inject(DestroyRef);

  loginLoading = signal(false);
  loginForm!: FormGroup;
  get email() {
    return this.loginForm.get('email') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginLoading.set(true);
    this._loginUseCase.execute(this.loginForm.value).pipe(
      tap((data) => {
        this._toaster.show(data.message, true);
      }),
      takeUntilDestroyed(this._destroyRef),
      finalize(() => this.loginLoading.set(false))
    ).subscribe({
      next: (data) => {
        this._storage.setItem<string>('token', data.token);
        this._router.navigate(['/dash'], { replaceUrl: true });
      },
    })

  }

}
