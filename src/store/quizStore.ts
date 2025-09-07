import { create } from 'zustand';
import { Question, QuizResult, UserAnswer } from '@/lib/types';

type QuizState = {
    questions: Question[];
    currentQuestionIndex: number;
    selectedAnswers: UserAnswer[];
    quizResult: QuizResult | null;
    setQuizData: (questions: Question[]) => void;
    selectAnswer: (questionId: string, answerText: string) => void;
    nextQuestion: () => void;
    setResult: (result: QuizResult) => void;
    reset: () => void;
};

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    quizResult: null,
}

export const useQuizStore = create<QuizState>((set) => ({
    ...initialState,
    setQuizData: (questions) => set({
        ...initialState, // Reset state when a new quiz is loaded
        questions
    }),
    selectAnswer: (questionId, answerText) =>
        set((state) => ({
            selectedAnswers: [
                ...state.selectedAnswers.filter((a) => a.questionId !== questionId),
                { questionId, answerText },
            ],
        })),
    nextQuestion: () =>
        set((state) => ({
            currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length),
        })),
    setResult: (result) => set({ quizResult: result }),
    reset: () => set(initialState)
}));