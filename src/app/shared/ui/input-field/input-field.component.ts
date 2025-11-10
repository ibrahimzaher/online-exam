import { Component, input } from '@angular/core';
import { FormControl, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormErrorComponent } from './components/form-error/form-error.component';

@Component({
  selector: 'app-input-field',
  imports: [
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    NgxIntlTelInputModule,
    FormErrorComponent,
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
  get control(): FormControl {
    return this.controller() as FormControl;
  }
  get hasError(): boolean {
    return !!(this.controller().errors && this.controller().touched);
  }
}
