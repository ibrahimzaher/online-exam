import { Observable } from 'rxjs';

export abstract class DashboardRepo {
  abstract getAllSubjects(page?: number): Observable<GetAllSubjectsResponse>;
  abstract getAllExams(page?: number): Observable<GetAllExamsResponse>;
  abstract getAllExamsBySubject(subject: string, page?: number): Observable<GetAllExamsResponse>;
  abstract getAllQuestionsByExam(exam: string): Observable<GetAllQuestionsResponse>;
}
