import { Component, computed, input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { getErrorMessage } from '../../../../utils/form-error.utils';

@Component({
  selector: 'app-form-error',
  imports: [MessageModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent {
  controller = input.required<FormControl | AbstractControl>();
  label = input<string>();
  otp = input<boolean>(false);
  type = input<'text' | 'email' | 'password' | 'tel'>('text');
  get controll(): FormControl {
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
