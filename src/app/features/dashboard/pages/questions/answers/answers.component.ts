import { Component, input } from '@angular/core';

@Component({
  selector: 'app-answers',
  imports: [],
  templateUrl: './answers.component.html',
  styleUrl: './answers.component.css',
})
export class AnswersComponent {
  questions = input.required<Question[]>();
  answers = input.required<Record<string, string>>();
  score = input.required<number>();

  percentage() {
    if (!this.questions().length) return 0;
    return (this.score() / this.questions().length) * 100;
  }
  getAnswerText(question: Question, key: string): string {
    return question.answers.find((a) => a.key === key)?.answer ?? 'Not Have Answer';
  }
}
