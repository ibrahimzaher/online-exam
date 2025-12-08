import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';

export const dashboardFeatureKey = 'dashboard';

export interface DashboardState {
  subjects: Subject[];
  exams: Exam[];
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, string>;
}

export const initialState: DashboardState = {
  subjects: [],
  exams: [],
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardApiActions.getDiplomasSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
  })),
  on(DashboardPageActions.loadExams, (state) => ({
    ...state,
    exams: [],
  })),
  on(DashboardPageActions.loadQuestions, (state) => ({
    ...state,
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
  })),
  on(DashboardApiActions.getExamsSuccess, (state, { exams }) => ({
    ...state,
    exams,
  })),
  on(DashboardApiActions.getQuestionsSuccess, (state, { questions }) => ({
    ...state,
    questions: [...questions],
    currentQuestionIndex: 0,
  })),
  on(DashboardPageActions.setCurrentIndexQuestion, (state, { index }) => ({
    ...state,
    currentQuestionIndex: index,
  })),
  on(DashboardPageActions.nextQuestion, (state) => ({
    ...state,
    currentQuestionIndex:
      state.currentQuestionIndex < state.questions.length - 1
        ? state.currentQuestionIndex + 1
        : state.currentQuestionIndex,
  })),
  on(DashboardPageActions.perviousQuestion, (state) => ({
    ...state,
    currentQuestionIndex: state.currentQuestionIndex > 0 ? state.currentQuestionIndex - 1 : 0,
  })),
  on(DashboardPageActions.saveAnswer, (state, { id, answer }) => ({
    ...state,
    answers: {
      ...state.answers,
      [id]: answer,
    },
  }))
);

export const dashboardFeature = createFeature({
  name: dashboardFeatureKey,
  reducer: dashboardReducer,
});

export const {
  selectDashboardState,
  selectSubjects,
  selectExams,
  selectQuestions,
  selectCurrentQuestionIndex,
  selectAnswers,
} = dashboardFeature;

export const selectCurrentQuestion = createSelector(
  selectQuestions,
  selectCurrentQuestionIndex,
  (questions, index) => questions[index]
);

export const selectCurrentAnswer = createSelector(
  selectQuestions,
  selectDashboardState,
  (questions, state) => {
    const question = questions[state.currentQuestionIndex];
    return question ? state.answers[question._id] : null;
  }
);
export const selectScore = createSelector(selectQuestions, selectAnswers, (questions, answers) =>
  questions.reduce((score, question) => {
    return answers[question._id] === question.correct ? score + 1 : score;
  }, 0)
);
