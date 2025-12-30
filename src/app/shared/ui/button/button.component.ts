import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
type ButtonType = 'primary' | 'danger' | 'alert' | 'success';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  label = input.required<string>();
  icon = input<string>();
  loading = input<boolean>(false);
  typeButton = input<ButtonType>('primary');
  type = input<'button' | 'submit' | 'reset'>('submit');
  disabled = input<boolean>(false);
  get classes() {
    return {
      'btn-primary': this.typeButton() === 'primary',
      'btn-danger': this.typeButton() === 'danger',
      'btn-alert': this.typeButton() === 'alert',
      'btn-success': this.typeButton() === 'success',
    };
  }
  iconPos = input<'left' | 'right' | 'top' | 'bottom'>('right');
}
