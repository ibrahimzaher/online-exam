import { inject, Injectable } from '@angular/core';
import { DashboardRepo } from '../repo/dashboard-repo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllQuestionsByExamUsecase {
  private readonly repo = inject(DashboardRepo);
  execute(exam: string): Observable<GetAllQuestionsResponse> {
    return this.repo.getAllQuestionsByExam(exam);
  }
}
