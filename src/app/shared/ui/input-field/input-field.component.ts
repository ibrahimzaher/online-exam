import { Component, input } from '@angular/core';
import { FormControl, AbstractControl, ReactiveFormsModule, FormArray } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { NgOtpInputComponent } from 'ng-otp-input';

@Component({
  selector: 'app-input-field',
  imports: [
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    NgxIntlTelInputModule,
    FormErrorComponent,
    NgOtpInputComponent,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  label = input<string>();
  id = input.required<string>();
  placeholder = input<string>('');
  type = input<'text' | 'email' | 'password' | 'tel' | 'otp'>('text');
  controller = input.required<any>();
  feedback = input<boolean>(false);
  toggleMask = input<boolean>(true);
  get control(): FormControl {
    return this.controller() as FormControl;
  }

  get hasError(): boolean {
    const control = this.controller();
    return !!(control.errors && control.touched);
  }
}
