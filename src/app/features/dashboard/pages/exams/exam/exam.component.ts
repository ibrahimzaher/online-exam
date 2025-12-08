import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css',
})
export class ExamComponent {
  exam = input.required<Exam>();
  private router = inject(Router);
  naviagetTo() {
    this.router.navigate(['/questions', this.exam()._id]);
  }
}
