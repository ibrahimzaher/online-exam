import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { DashBoardEndPoint } from './dashboard-endpoint';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly httpClient = inject(HttpClient);
  geAllSubject(page: number = 1): Observable<GetAllSubjectsResponse> {
    return this.httpClient.get<GetAllSubjectsResponse>(
      environment.baseUrl + DashBoardEndPoint.getAllSubjects,
      {
        params: {
          page: page,
        },
      }
    );
  }
  getAllExams(page: number = 1): Observable<GetAllExamsResponse> {
    return this.httpClient.get<GetAllExamsResponse>(
      environment.baseUrl + DashBoardEndPoint.getAllExams,
      {
        params: {
          page,
        },
      }
    );
  }
  getAllExamsBySubject(subject: string, page: number = 1): Observable<GetAllExamsResponse> {
    return this.httpClient.get<GetAllExamsResponse>(
      environment.baseUrl + DashBoardEndPoint.getAllExams,
      {
        params: {
          subject,
          page,
        },
      }
    );
  }
  getAllQuestionsByExam(exam: string): Observable<GetAllQuestionsResponse> {
    return this.httpClient.get<GetAllQuestionsResponse>(
      environment.baseUrl + DashBoardEndPoint.getAllQuestion,
      {
        params: {
          exam,
        },
      }
    );
  }
}
