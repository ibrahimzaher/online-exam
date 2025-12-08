import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressSpinner } from 'primeng/progressspinner';
import { map } from 'rxjs';
import { loadExamsLoading } from '../../../../core/store/ui/ui.constant';
import { selectLoadingKey } from '../../../../core/store/ui/ui.reducer';
import { EmptyListComponent } from '../../components/empty-list/empty-list.component';
import { HeaderComponent } from '../../components/header/header.component';
import { DashboardPageActions } from '../../store/dashboard/dashboard.actions';
import { selectExams } from '../../store/dashboard/dashboard.reducer';
import { ExamComponent } from './exam/exam.component';

@Component({
  selector: 'app-exams',
  imports: [HeaderComponent, ExamComponent, ProgressSpinner, EmptyListComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css',
})
export class ExamsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  id = toSignal(this.route.paramMap.pipe(map((data) => data.get('id'))));
  exams = this.store.selectSignal(selectExams);
  loading = this.store.selectSignal(selectLoadingKey(loadExamsLoading));
  ngOnInit(): void {
    // when api exam by subject
    // this.store.dispatch(DashboardPageActions.loadExamsBySubject({ subjectId: this.id()! }));
    this.store.dispatch(DashboardPageActions.loadExams());
  }
}
