
export interface Option {
    text: string;
}

export interface Question {
    id: string;
    question_text: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    options: Option[];
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface Quiz {
    id: string;
    title: string;
    topic: string;
    questions: Question[];
}

export interface UserAnswer {
    questionId: string;
    answerText: string;
}

export interface QuizResult {
    message: string;
    score: number;
    totalQuestions: number;
    correctAnswers: Record<string, string>;
    userAnswers: UserAnswer[];
}

export interface QuizAttempt {
    attemptId: string;
    quizId: string;
    quizTitle: string;
    score: number;
    totalQuestions: number;
    completedAt: string;
}