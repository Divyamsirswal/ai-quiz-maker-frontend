"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Eye, RefreshCw } from "lucide-react";

export const AttemptRow = ({ attempt }: { attempt: any }) => {
    const scorePercentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

    return (
        <Dialog>
            <Card className="flex items-center justify-between p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900">
                <div className="flex flex-col">
                    <p className="font-bold text-lg">{attempt.quizTitle}</p>
                    <p className="text-sm text-muted-foreground">
                        {format(new Date(attempt.completedAt), "MMMM d, yyyy")}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-xl">{scorePercentage}%</p>
                        <Progress value={scorePercentage} className="w-24" />
                    </div>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" aria-label="View Details">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <Button asChild size="icon" aria-label="Try Again">
                        <Link href={`/quiz/${attempt.quizId}`}><RefreshCw className="h-4 w-4" /></Link>
                    </Button>
                </div>
            </Card>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{attempt.quizTitle}</DialogTitle>
                    <DialogDescription>
                        Attempt from {format(new Date(attempt.completedAt), "PPP p")}
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <p className="text-5xl font-bold text-center mb-2">{scorePercentage}%</p>
                    <p className="text-muted-foreground text-center">
                        You scored {attempt.score} out of {attempt.totalQuestions} correct.
                    </p>
                    <Progress value={scorePercentage} className="mt-4 h-3" />
                </div>
                <div className="flex flex-col gap-4">
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