"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Question } from '@/lib/types';

interface QuestionCardProps {
    question: Question;
    questionIndex: number;
    totalQuestions: number;
    selectedOption: string | undefined;
    onAnswerSelect: (answer: string) => void;
    onNext: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
}

export const QuestionCard = ({
    question,
    questionIndex,
    totalQuestions,
    selectedOption,
    onAnswerSelect,
    onNext,
    onSubmit,
    isSubmitting,
}: QuestionCardProps) => {
    const isLastQuestion = questionIndex === totalQuestions - 1;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{`Question ${questionIndex + 1} of ${totalQuestions}`}</CardTitle>
                    <CardDescription className="text-lg pt-2">{question.question_text}</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={selectedOption} onValueChange={onAnswerSelect} className="space-y-3">
                        {question.options.map((option, index: number) => (
                            <Label key={index} htmlFor={`option-${index}`} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:text-primary cursor-pointer transition-colors">
                                <RadioGroupItem value={option.text} id={`option-${index}`} />
                                <span>{option.text}</span>
                            </Label>
                        ))}
                    </RadioGroup>
                </CardContent>
                <CardFooter>
                    {isLastQuestion ? (
                        <Button onClick={onSubmit} disabled={isSubmitting || !selectedOption} className="w-full">
                            {isSubmitting ? 'Submitting...' : 'Submit & See Results'}
                        </Button>
                    ) : (
                        <Button onClick={onNext} disabled={!selectedOption} className="w-full">
                            Next Question
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
};