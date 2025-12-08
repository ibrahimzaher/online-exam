import { inject, Injectable } from '@angular/core';
import { DashboardRepo } from '../../domain/repo/dashboard-repo';
import { Observable } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiRepo implements DashboardRepo {
  getAllQuestionsByExam(exam: string): Observable<GetAllQuestionsResponse> {
    return this.service.getAllQuestionsByExam(exam);
  }
  private readonly service = inject(DashboardService);
  getAllSubjects(page?: number): Observable<GetAllSubjectsResponse> {
    return this.service.geAllSubject(page);
  }
  getAllExams(page?: number): Observable<GetAllExamsResponse> {
    return this.service.getAllExams(page);
  }
  getAllExamsBySubject(subject: string, page?: number): Observable<GetAllExamsResponse> {
    return this.service.getAllExamsBySubject(subject, page);
  }
}
