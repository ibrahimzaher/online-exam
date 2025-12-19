import { inject, Injectable } from '@angular/core';
import { DashboardRepo } from '../repo/dashboard-repo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllExamsBySubjectUsecase {
  private readonly repo = inject(DashboardRepo);
  execute(subject: string, page?: number): Observable<GetAllExamsResponse> {
    return this.repo.getAllExamsBySubject(subject, page);
  }
}
