import { Component, DestroyRef, inject, Input, input, output, signal } from '@angular/core';
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
import { VerifyResetCodeUsecaseService } from '@izaher-dev/auth';
import { ToasterService } from '../../../../../../core/services/toaster.service';
import { finalize, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _verifyResetCodeUsecaseService = inject(VerifyResetCodeUsecaseService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _toasterService = inject(ToasterService);
  verifyLoading = signal(false);

  step = output<number>();
  email = input.required<string>();
  resetForm!: FormGroup;

  ngOnInit(): void {
    this.resetForm = this._fb.group({
      code1: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
      code2: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
      code3: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
      code4: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
      code5: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
      code6: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]?$')]],
    });
  }

  get codeControls() {
    return [
      this.resetForm.get('code1') as FormControl,
      this.resetForm.get('code2') as FormControl,
      this.resetForm.get('code3') as FormControl,
      this.resetForm.get('code4') as FormControl,
      this.resetForm.get('code5') as FormControl,
      this.resetForm.get('code6') as FormControl,
    ];
  }

  verifyCode() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    this.verifyLoading.set(true);
    const code = Object.values(this.resetForm.value).join('');
    this._verifyResetCodeUsecaseService
      .execute({ resetCode: code })
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
}
