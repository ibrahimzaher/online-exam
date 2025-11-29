import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { interval, takeWhile, tap } from 'rxjs';
import { PlatformService } from '../../../../../../core/services/platform.service';
import { buttonVerifyLoading } from '../../../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../../../core/store/ui/ui.reducer';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { AuthApiActions, AuthPageActions } from '../../../../store/auth.actions';
import { selectForgetFlowEmail } from '../../../../store/auth.reducer';
import { AuthForms } from './../../../../forms/auth-forms.service';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly authForms = inject(AuthForms);
  private readonly store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(buttonVerifyLoading));
  timer = signal<number>(60);
  private platform = inject(PlatformService);
  private destroy = inject(DestroyRef);
  email = this.store.selectSignal(selectForgetFlowEmail);
  otpFrom = this.authForms.initVerifyCoderForm();
  private actions$ = inject(Actions);
  startDownTimer() {
    if (!this.platform.isBrowser()) return;
    this.timer.set(60);
    interval(1000)
      .pipe(
        takeWhile(() => this.timer() > 0),
        tap(() => this.timer.update((val) => val - 1)),
        takeUntilDestroyed(this.destroy)
      )
      .subscribe();
  }
  constructor() {
    this.actions$
      .pipe(ofType(AuthApiActions.forgetPasswordSuccess), takeUntilDestroyed(this.destroy))
      .subscribe(() => {
        console.log('Forget Password Success Action Received - Starting Timer');
        this.startDownTimer();
      });
  }
  ngAfterViewInit(): void {
    this.startDownTimer();
  }

  get controls() {
    return this.otpFrom.controls;
  }

  verifyCode() {
    if (this.otpFrom.invalid) {
      this.otpFrom.markAllAsTouched();
      return;
    }
    this.store.dispatch(AuthPageActions.verifyResetCodeSubmitted(this.otpFrom.getRawValue()));
  }
  changeSteps(step: number) {
    this.store.dispatch(AuthPageActions.changeStepsSubmitted({ step }));
  }
  requestCode() {
    this.store.dispatch(AuthPageActions.forgetPasswordSubmitted({ email: this.email()! }));
  }
}
