import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isBack = input<boolean>(false);
  navigateUrl = input<string>('');
  title = input.required<string>();
  icon = input.required<string>();
}
