import { GetAllExamsUsecase } from './../../domain/use-case/get-all-exams.usecase ';
import { GetAllSubjectsUsecase } from './../../domain/use-case/get-all-subjects.usecase';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { UiActions } from '../../../../core/store/ui/ui.actions';
import {
  loadDiplomasLoading,
  loadExamsLoading,
  loadQuestionsLoading,
} from '../../../../core/store/ui/ui.constant';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';
import { GetAllExamsBySubjectUsecase } from '../../domain/use-case/get-all-exams-by-subject.usecase ';
import { GetAllQuestionsByExamUsecase } from '../../domain/use-case/get-all-questions-by-exam.usecase ';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private getAllSubjextsUsecase = inject(GetAllSubjectsUsecase);
  private getAllExamsUsecase = inject(GetAllExamsUsecase);
  private getAllExamsBySubjectUsecase = inject(GetAllExamsBySubjectUsecase);
  private getAllQuestionsByExamUsecase = inject(GetAllQuestionsByExamUsecase);
  loadDiplomas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadDiplomas),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: loadDiplomasLoading }))),
      switchMap(() =>
        this.getAllSubjextsUsecase.execute().pipe(
          map(({ subjects }) => DashboardApiActions.getDiplomasSuccess({ subjects: subjects })),
          catchError((err: any) =>
            of(
              DashboardApiActions.getDiplomasFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: loadDiplomasLoading })))
        )
      )
    );
  });

  loadExams$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadExams),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: loadExamsLoading }))),
      switchMap(() =>
        this.getAllExamsUsecase.execute().pipe(
          map(({ exams }) => DashboardApiActions.getExamsSuccess({ exams })),
          catchError((err: any) =>
            of(
              DashboardApiActions.getExamsFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: loadExamsLoading })))
        )
      )
    );
  });
  loadExamsBySubject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadExamsBySubject),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: loadExamsLoading }))),
      switchMap(({ subjectId }) =>
        this.getAllExamsBySubjectUsecase.execute(subjectId).pipe(
          map(({ exams }) => DashboardApiActions.getExamsSuccess({ exams })),
          catchError((err: any) =>
            of(
              DashboardApiActions.getExamsFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: loadExamsLoading })))
        )
      )
    );
  });
  loadQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadQuestions),
      tap(() => this.store.dispatch(UiActions.startLoading({ key: loadQuestionsLoading }))),
      switchMap(({ examId }) =>
        this.getAllQuestionsByExamUsecase.execute(examId).pipe(
          map(({ questions }) => DashboardApiActions.getQuestionsSuccess({ questions })),
          catchError((err: any) =>
            of(
              DashboardApiActions.getQuestionsFailure({
                message: err?.message ?? 'An unexpected error occurred',
              })
            )
          ),
          finalize(() => this.store.dispatch(UiActions.stopLoading({ key: loadQuestionsLoading })))
        )
      )
    );
  });
}
