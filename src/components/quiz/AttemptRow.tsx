"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { QuizAttempt } from "@/lib/types";

export const AttemptCard = ({ attempt }: { attempt: QuizAttempt }) => {
    const scorePercentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

    return (
        <Dialog>
            <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="truncate" title={attempt.quizTitle}>
                        {attempt.quizTitle}
                    </CardTitle>
                    <CardDescription>
                        Taken on: {format(new Date(attempt.completedAt), "MMMM d, yyyy")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Score</p>
                        <p className="text-sm font-bold">{attempt.score} / {attempt.totalQuestions} ({scorePercentage}%)</p>
                    </div>
                    <Progress value={scorePercentage} />
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2">
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full gap-2">
                            <Eye className="h-4 w-4" /> View
                        </Button>
                    </DialogTrigger>
                    <Button asChild variant="secondary" className="w-full gap-2">
                        <Link href={`/quiz/${attempt.quizId}`}>
                            <RefreshCw className="h-4 w-4" /> Try Again
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{attempt.quizTitle}</DialogTitle>
                    <DialogDescription>
                        Attempt from {format(new Date(attempt.completedAt), "PPP p")}
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 text-center">
                    <p className="text-6xl font-bold">{scorePercentage}%</p>
                    <p className="text-muted-foreground mt-2">
                        You scored {attempt.score} out of {attempt.totalQuestions} correct.
                    </p>
                    <Progress value={scorePercentage} className="mt-4 h-3" />
                </div>
                <div className="flex gap-4">
                    <Button asChild variant="secondary" className="w-full">
                        <Link href={`/quiz/${attempt.quizId}`}>Try Again</Link>
                    </Button>
                    <Button asChild className="w-full">
                        <Link href="/create-quiz">Create a New Quiz</Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};