"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateQuiz } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

export default function CreateQuizPage() {
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const mutation = useCreateQuiz();

    const handleCreateQuiz = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            toast.error("Please enter a topic to generate a quiz.");
            return;
        }

        toast.promise(mutation.mutateAsync({ topic }), {
            loading: "Generating your quiz... The AI is thinking 🤔",
            success: (data) => {
                router.push(`/quiz/${data.quizId}`);
                return "Your quiz is ready! Let's go!";
            },
            error: (error) => {
                return `Error: ${error.message}`;
            },
        });
    };

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-lg">
                <form onSubmit={handleCreateQuiz} className="flex flex-col gap-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Sparkles className="h-6 w-6 text-primary" />
                            Create a New Quiz
                        </CardTitle>
                        <CardDescription className="tracking-tight">
                            Enter any topic below, and our AI will craft a unique quiz just
                            for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="topic" className="font-semibold">Topic</Label>
                            <Input
                                id="topic"
                                placeholder="e.g., The Roman Empire, Solar System, React.js..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="text-base"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={mutation.isPending} className="w-full">
                            {mutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Quiz"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}