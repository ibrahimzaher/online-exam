import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressSpinner } from 'primeng/progressspinner';
import { map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { AnswersComponent } from './answers/answers.component';
import { loadQuestionsLoading } from '../../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../../core/store/ui/ui.reducer';
import { DashboardPageActions } from '../../../store/dashboard/dashboard.actions';
import {
  selectQuestions,
  selectCurrentQuestionIndex,
  selectCurrentQuestion,
  selectCurrentAnswer,
  selectAnswers,
  selectScore,
} from '../../../store/dashboard/dashboard.reducer';
import { HeaderComponent } from '../../../components/header/header.component';
import { EmptyListComponent } from '../../../components/empty-list/empty-list.component';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-questions',
  imports: [
    ProgressSpinner,
    ProgressBar,
    CommonModule,
    AnswersComponent,
    HeaderComponent,
    EmptyListComponent,
    ButtonComponent,
  ],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  private store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(loadQuestionsLoading));
  questions = this.store.selectSignal(selectQuestions);
  currentIndex = this.store.selectSignal(selectCurrentQuestionIndex);
  currentQuestion = this.store.selectSignal(selectCurrentQuestion);
  currentAnswer = this.store.selectSignal(selectCurrentAnswer);
  error = signal('');
  answers = this.store.selectSignal(selectAnswers);
  private router = inject(ActivatedRoute);
  examId = toSignal(this.router.paramMap.pipe(map((data) => data.get('examId'))));
  score = this.store.selectSignal(selectScore);
  title = computed(() => {
    if (this.questions().length == 0) return '';
    return this.questions()[0].exam.title;
  });
  constructor() {
    const id = this.examId();
    if (id) {
      this.store.dispatch(DashboardPageActions.loadQuestions({ examId: id }));
    }
  }
  showAnswer = signal(false);
  saveAnswer(answer: string) {
    const question = this.currentQuestion();
    if (question) {
      this.store.dispatch(DashboardPageActions.saveAnswer({ id: question._id, answer }));
    }
  }

  next() {
    if (!this.currentAnswer()) {
      this.error.set('Please select an answer first');
      return;
    }
    if (this.questions().length == this.currentIndex() + 1) {
      this.showAnswer.set(true);
      return;
    }
    this.error.set('');
    this.store.dispatch(DashboardPageActions.nextQuestion());
  }
  restart() {
    this.showAnswer.set(false);
    const id = this.examId();

    this.store.dispatch(DashboardPageActions.loadQuestions({ examId: id! }));
  }
  pervious() {
    this.store.dispatch(DashboardPageActions.perviousQuestion());
  }
}
