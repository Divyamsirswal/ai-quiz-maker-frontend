"use client";

import { useGetMyAttempts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuizAttempt } from "@/lib/types";
import { AttemptCard } from "@/components/quiz/AttemptRow";
import { VaultSkeleton } from "@/components/quiz/VaultSkeleton";

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
                    {attempts.map((attempt: QuizAttempt) => (
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
                        <Link href="/create-quiz">Create a Quiz</Link>
                    </Button>
                </div>
            )}
        </div>
    );
}