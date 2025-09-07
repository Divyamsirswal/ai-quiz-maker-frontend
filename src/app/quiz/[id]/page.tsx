"use client";

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGetQuiz, useSubmitQuiz } from '@/lib/api';
import { useQuizStore } from '@/store/quizStore';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence } from "framer-motion";
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { ResultsCard } from '@/components/quiz/ResultsCard';
import { toast } from 'sonner';

export default function QuizPage() {
    const params = useParams();
    const quizId = params.id as string;

    const {
        questions,
        currentQuestionIndex,
        selectedAnswers,
        quizResult,
        setQuizData,
        selectAnswer,
        nextQuestion,
        setResult,
        reset
    } = useQuizStore();

    const { data: quizData, isLoading, isError } = useGetQuiz(quizId);
    const submitMutation = useSubmitQuiz();

    useEffect(() => {
        if (quizData) {
            setQuizData(quizData.questions);
        }
        return () => {
            reset();
        }
    }, [quizData, setQuizData, reset]);

    const handleSubmit = () => {
        toast.promise(submitMutation.mutateAsync({ quizId, answers: selectedAnswers }), {
            loading: "Submitting your answers...",
            success: (data) => {
                setResult(data);
                return "Results are in!";
            },
            error: (error) => `Error: ${error.message}`
        });
    };

    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = selectedAnswers.find(a => a.questionId === currentQuestion?.id)?.answerText;

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading quiz...</div>;
    if (isError) return <div className="flex items-center justify-center min-h-screen text-red-500">Failed to load the quiz.</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl mt-10">
            {quizResult ? (
                <ResultsCard quizResult={quizResult} quizData={quizData} />
            ) : (
                <>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            Question {currentQuestionIndex + 1} / {questions.length}
                        </span>
                        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
                    </div>
                    <AnimatePresence mode="wait">
                        {currentQuestion && (
                            <QuestionCard
                                key={currentQuestion.id}
                                question={currentQuestion}
                                questionIndex={currentQuestionIndex}
                                totalQuestions={questions.length}
                                selectedOption={selectedOption}
                                onAnswerSelect={(answer) => selectAnswer(currentQuestion.id, answer)}
                                onNext={nextQuestion}
                                onSubmit={handleSubmit}
                                isSubmitting={submitMutation.isPending}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}