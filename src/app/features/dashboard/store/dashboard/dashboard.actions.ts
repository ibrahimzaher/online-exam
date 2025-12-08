import { MessageModel } from '@izaher-dev/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DashboardPageActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Diplomas': emptyProps(),
    'Load Exams': emptyProps(),
    'Load Exams By Subject': props<{ subjectId: string }>(),
    'Load Questions': props<{ examId: string }>(),
    'Set Current Index Question': props<{ index: number }>(),
    'Next Question': emptyProps(),
    'Pervious Question': emptyProps(),
    'Save Answer': props<{ id: string; answer: string }>(),
    'set Score': props<{ score: number }>(),
  },
});

export const DashboardApiActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Get Diplomas Success': props<{ subjects: Subject[] }>(),
    'Get Diplomas Failure': props<MessageModel>(),
    'Get Exams Success': props<{ exams: Exam[] }>(),
    'Get Exams Failure': props<MessageModel>(),
    'Get Questions Success': props<{ questions: Question[] }>(),
    'Get Questions Failure': props<MessageModel>(),
  },
});
