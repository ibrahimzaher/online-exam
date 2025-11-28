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

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly authForms = inject(AuthForms);
  private readonly _verifyResetCodeUsecaseService = inject(VerifyResetCodeUsecaseService);
  private readonly _forgetPasswordUsecaseService = inject(ForgetPasswordUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toasterService = inject(ToasterService);
  private readonly _platformService = inject(PlatformService);
  verifyLoading = signal(false);
  timer = signal<number>(60);
  step = output<number>();
  email = input.required<string>();
  otpFrom = this.authForms.initVerifyCoderForm();
  startDownTimer() {
    if (!this._platformService.isBrowser()) return;
    this.timer.set(60);
    interval(1000)
      .pipe(
        takeWhile(() => this.timer() > 0),
        tap(() => this.timer.update((val) => val - 1)),
        takeUntilDestroyed(this._destroyRef)
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
    this.verifyLoading.set(true);
    this._verifyResetCodeUsecaseService
      .execute(this.otpFrom.getRawValue())
      .pipe(
        tap((data) => this._toasterService.show(data.status)),
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.verifyLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.step.emit(3);
        },
      });
  }
  requestCode() {
    this._forgetPasswordUsecaseService
      .execute({ email: this.email() })
      .pipe(
        tap((data) => {
          this._toasterService.show(data.message);
          this.startDownTimer();
        }),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe();
  }
}
