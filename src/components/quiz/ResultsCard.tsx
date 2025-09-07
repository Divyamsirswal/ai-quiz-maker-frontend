"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";
import { Question, Quiz, QuizResult, UserAnswer } from '@/lib/types';
import { motion } from "framer-motion";
import Confetti from 'react-confetti';
import { useEffect, useState } from "react";

interface ResultsCardProps {
    quizResult: QuizResult;
    quizData: Quiz | undefined;
}

export const ResultsCard = ({ quizResult, quizData }: ResultsCardProps) => {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState(false);
    const scorePercentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);

    useEffect(() => {
        if (scorePercentage > 70) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
    }, [scorePercentage]);

    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

            <Card className="shadow-lg">
                <CardHeader className="items-center">
                    <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
                    <CardDescription className="text-center text-lg pt-2">Your final score is</CardDescription>
                    <p className="text-6xl font-bold pt-4 text-primary">{scorePercentage}%</p>
                    <p className="text-muted-foreground">{quizResult.score} out of {quizResult.totalQuestions} correct</p>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-semibold mt-4 mb-4 text-center">Review Your Answers</h3>
                    <ul className="space-y-4">
                        {quizData?.questions.map((q: Question) => {
                            const userAnswer = quizResult.userAnswers.find((a: UserAnswer) => a.questionId === q.id)?.answerText;
                            const correctAnswer = quizResult.correctAnswers[q.id];
                            const isCorrect = userAnswer === correctAnswer;
                            return (
                                <li key={q.id} className={`border p-4 rounded-lg ${isCorrect ? 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800' : 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800'}`}>
                                    <p className="font-semibold">{q.question_text}</p>
                                    <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                                        {isCorrect ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                                        Your answer: {userAnswer || <span className="italic">Not answered</span>}
                                    </div>
                                    {!isCorrect && (
                                        <div className="flex items-center mt-1 text-green-800 dark:text-green-500">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Correct answer: {correctAnswer}
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </CardContent>
                <CardFooter className="flex-col gap-4 mt-4">
                    <Button onClick={() => router.push('/create-quiz')} className="w-full">Create Another Quiz</Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/vault">View My Quiz Vault</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};