import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diploma',
  imports: [],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.css',
})
export class DiplomaComponent {
  subject = input.required<Subject>();
  private router = inject(Router);
  navigateTo() {
    this.router.navigate(['/exams', this.subject()._id]);
  }
}
