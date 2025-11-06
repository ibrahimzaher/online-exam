import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

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
  iconPos = input<'left' | 'right' | 'top' | 'bottom'>('right');
}
