import { inject, Injectable } from '@angular/core';
import { DashboardRepo } from '../repo/dashboard-repo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllExamsUsecase {
  private readonly repo = inject(DashboardRepo);
  execute(page?: number): Observable<GetAllExamsResponse> {
    return this.repo.getAllExams(page);
  }
}
