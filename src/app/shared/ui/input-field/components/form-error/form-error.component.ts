import { Component, input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { getErrorMessage } from '../../../../utils/form-error.utils';

@Component({
  selector: 'app-form-error',
  imports: [MessageModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent {
  controller = input.required<any>();
  label = input<string>();
  type = input<'text' | 'email' | 'password' | 'tel' | 'otp'>('text');

  get errorMessages(): string[] {
    const errors = this.controller().errors;
    if (!errors) return [];

    return Object.keys(errors).map((key) =>
      getErrorMessage(key, errors[key], {
        label: this.label(),
        type: this.type(),
      })
    );
  }
}
