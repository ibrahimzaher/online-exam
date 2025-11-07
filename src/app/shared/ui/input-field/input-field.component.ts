import { Component, input } from '@angular/core';
import { FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { getErrorMessage } from '../../utils/form-error.utils';

@Component({
  selector: 'app-input-field',
  imports: [
    PasswordModule,
    MessageModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    NgxIntlTelInputModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  label = input<string>();
  id = input.required<string>();
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password' | 'tel'>('text');
  controller = input.required<FormControl | AbstractControl>();
  feedback = input<boolean>(false);
  toggleMask = input<boolean>(true);
  otp = input<boolean>(false);
  get hasError(): boolean {
    return !!(this.controller().errors && this.controller().touched);
  }
  get control(): FormControl {
    return this.controller() as FormControl;
  }
  get errorMessages(): string[] {
    const errors = this.controller().errors;
    if (!errors) return [];

    return Object.keys(errors).map((key) =>
      getErrorMessage(key, errors[key], {
        label: this.label(),
        otp: this.otp(),
        type: this.type(),
      })
    );
  }
}
