
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { AuthCredentials, Quiz, QuizAttempt, QuizResult, UserAnswer } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = useAuthStore.getState().token;
    const headers: Record<string, string> = { "Content-Type": "application/json" };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        ...options,
        headers: { ...headers, ...options.headers },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An API error occurred");
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    }
    return;
};

export const useCreateQuiz = () => {
    return useMutation<
        { quizId: string },
        Error,
        { topic: string }
    >({
        mutationFn: (quizData) =>
            apiFetch('quizzes', {
                method: 'POST',
                body: JSON.stringify(quizData),
            }),
    });
};

export const useGetQuiz = (quizId: string) => {
    return useQuery<Quiz>({
        queryKey: ['quiz', quizId],
        queryFn: () => apiFetch(`quizzes/${quizId}`),
        enabled: !!quizId,
    });
};

export const useSubmitQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation<QuizResult, Error, { quizId: string; answers: UserAnswer[] }>({
        mutationFn: ({ quizId, answers }) =>
            apiFetch(`quizzes/${quizId}/submit`, {
                method: 'POST',
                body: JSON.stringify({ answers }),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myAttempts'] });
        },
    });
};

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (credentials: AuthCredentials) =>
            apiFetch('users/register', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),
    });
};

export const useLoginUser = () => {
    return useMutation<{ token: string }, Error, AuthCredentials>({
        mutationFn: (credentials) =>
            apiFetch('users/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),
    });
};

export const useGetMyAttempts = () => {
    return useQuery<QuizAttempt[]>({
        queryKey: ['myAttempts'],
        queryFn: () => apiFetch('attempts'),
    });
};