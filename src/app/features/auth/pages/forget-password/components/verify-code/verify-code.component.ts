import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgetPasswordUsecaseService, VerifyResetCodeUsecaseService } from '@izaher-dev/auth';
import { finalize, interval, takeWhile, tap } from 'rxjs';
import { PlatformService } from '../../../../../../core/services/platform.service';
import { ToasterService } from '../../../../../../core/services/toaster.service';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { AuthForms } from './../../../../forms/auth-forms.service';
import { Store } from '@ngrx/store';
import { selectLoadingKey } from '../../../../../../core/store/ui/ui.reducer';
import { buttonVerifyLoading } from '../../../../../../core/store/ui/ui.constant';
import { selectForgetFlowEmail } from '../../../../store/auth.reducer';
import { AuthPageActions } from '../../../../store/auth.actions';

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
