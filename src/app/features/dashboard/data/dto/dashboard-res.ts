interface GetAllSubjectsResponse {
  message: string;
  metadata: Metadata;
  subjects: Subject[];
}
interface GetAllExamsResponse {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}
interface Subject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

interface GetAllQuestionsResponse {
  message: string;
  questions: Question[];
}

interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: null;
  exam: Exam;
  createdAt: string;
}

interface Answer {
  answer: string;
  key: string;
}
