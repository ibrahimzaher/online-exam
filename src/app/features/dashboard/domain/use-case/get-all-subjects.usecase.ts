import { inject, Injectable } from '@angular/core';
import { DashboardRepo } from '../repo/dashboard-repo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllSubjectsUsecase {
  private readonly repo = inject(DashboardRepo);
  execute(page?: number): Observable<GetAllSubjectsResponse> {
    return this.repo.getAllSubjects(page);
  }
}
