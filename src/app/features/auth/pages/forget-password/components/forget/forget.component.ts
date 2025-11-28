import { ToasterService } from './../../../../../../core/services/toaster.service';
import { Component, inject, output, DestroyRef, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../../../shared/ui/button/button.component';
import { InputFieldComponent } from '../../../../../../shared/ui/input-field/input-field.component';
import { ForgetPasswordReq, ForgetPasswordUsecaseService } from '@izaher-dev/auth';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthForms } from '../../../../forms/auth-forms.service';

@Component({
  selector: 'app-forget',
  imports: [InputFieldComponent, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  private readonly authForms = inject(AuthForms);
  private readonly _forgetUseCaseService = inject(ForgetPasswordUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toasterService = inject(ToasterService);
  step = output<number>();
  emailPass = output<string>();
  forgetForm = this.authForms.initForgetPasswordForm();
  forgetLoading = signal(false);
  get controls(): Record<keyof ForgetPasswordReq, FormControl<string>> {
    return this.forgetForm.controls;
  }
  continue() {
    if (this.forgetForm.invalid) {
      this.forgetForm.markAllAsTouched();
      return;
    }
    this.forgetLoading.set(true);

    this._forgetUseCaseService
      .execute(this.forgetForm.getRawValue())
      .pipe(
        tap((data) => this._toasterService.show(data.message)),
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.forgetLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.step.emit(2);
          this.emailPass.emit(this.controls.email.value);
        },
      });
  }
}
