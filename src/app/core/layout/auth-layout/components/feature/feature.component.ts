import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feature',
  imports: [],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css',
})
export class FeatureComponent {
  title = input.required<string>();
  desc = input.required<string>();
}
