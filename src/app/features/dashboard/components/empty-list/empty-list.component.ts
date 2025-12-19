import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  imports: [],
  templateUrl: './empty-list.component.html',
  styleUrl: './empty-list.component.css',
})
export class EmptyListComponent {
  title = input.required<string>();
}
