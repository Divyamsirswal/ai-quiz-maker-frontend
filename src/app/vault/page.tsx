"use client";

import { useGetMyAttempts } from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, RefreshCw } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AttemptCard = ({ attempt }: { attempt: any }) => {
    const scorePercentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

    return (
        <Dialog>
            <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="truncate text-sm font-bold" title={attempt.quizTitle}>
                        {attempt.quizTitle}
                    </CardTitle>
                    <CardDescription>
                        Taken on: {new Date(attempt.completedAt).toLocaleDateString()}
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
                        Attempt from {new Date(attempt.completedAt).toLocaleString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4 text-center">
                    <p className="text-6xl font-bold">{scorePercentage}%</p>
                    <p className="text-muted-foreground mt-2">
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


const VaultSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col h-full border rounded-lg p-4 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex-grow space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                </div>
                <Skeleton className="h-10 w-full" />
            </div>
        ))}
    </div>
)


export default function VaultPage() {
    const { data: attempts, isLoading, isError, error } = useGetMyAttempts();

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Quiz Vault</h1>
                <p className="text-muted-foreground">
                    Review your performance and retry quizzes to improve your score.
                </p>
            </div>

            {isLoading && <VaultSkeleton />}
            {isError && <p className="text-red-500">Error: {error.message}</p>}

            {!isLoading && attempts && attempts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {attempts.map((attempt: any) => (
                        <AttemptCard key={attempt.attemptId} attempt={attempt} />
                    ))}
                </div>
            )}

            {!isLoading && (!attempts || attempts.length === 0) && (
                <div className="text-center py-16 border-dashed border-2 rounded-lg mt-12">
                    <h2 className="text-xl font-medium">Your Vault is Empty</h2>
                    <p className="text-muted-foreground mt-2 mb-4">
                        After you take your first quiz, your results will appear here.
                    </p>
                    <Button asChild>
                        <Link href="/">Explore Quizzes</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}