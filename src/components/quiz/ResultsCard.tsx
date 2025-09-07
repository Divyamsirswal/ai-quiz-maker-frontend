"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface ResultsCardProps {
    quizResult: any;
    quizData: any;
}

export const ResultsCard = ({ quizResult, quizData }: ResultsCardProps) => {
    const router = useRouter();
    const scorePercentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);

    return (
        <div>
            <Card>
                <CardHeader className="items-center">
                    <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
                    <CardDescription className="text-center text-lg pt-2">Your final score is</CardDescription>
                    <p className="text-6xl font-bold pt-4">{scorePercentage}%</p>
                    <p className="text-muted-foreground">{quizResult.score} out of {quizResult.totalQuestions} correct</p>
                </CardHeader>
                <CardContent>
                    <h3 className="text-xl font-semibold mt-6 mb-4 text-center">Review Your Answers:</h3>
                    <ul className="space-y-4">
                        {quizData.questions.map((q: any) => {
                            const userAnswer = quizResult.userAnswers.find((a: any) => a.questionId === q.id)?.answerText;
                            const correctAnswer = quizResult.correctAnswers[q.id];
                            const isCorrect = userAnswer === correctAnswer;
                            return (
                                <li key={q.id} className="border p-4 rounded-lg">
                                    <p className="font-semibold">{q.question_text}</p>
                                    <div className={`flex items-center mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                        {isCorrect ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
                                        Your answer: {userAnswer || "Not answered"}
                                    </div>
                                    {!isCorrect && (
                                        <div className="flex items-center mt-1 text-green-700">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Correct answer: {correctAnswer}
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button onClick={() => router.push('/create-quiz')} className="w-full">Create Another Quiz</Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href="/">Go Home</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};