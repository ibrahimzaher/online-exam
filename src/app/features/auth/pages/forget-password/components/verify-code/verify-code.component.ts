import { Component, inject, output } from '@angular/core';
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

@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, InputFieldComponent, RouterLink, ButtonComponent],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  private readonly _fb = inject(FormBuilder);
  step = output<number>();
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
    if (this.resetForm.valid) {
      const code = Object.values(this.resetForm.value).join('');
      console.log('Full OTP:', code);
      this.step.emit(3);
    } else {
      this.resetForm.markAllAsTouched();
    }
  }
}
