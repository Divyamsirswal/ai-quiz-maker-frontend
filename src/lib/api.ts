import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = "http://localhost:8080/api/v1";


export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = useAuthStore.getState().token;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

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
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (quizData: { topic: string }) =>
            apiFetch('quizzes', {
                method: 'POST',
                body: JSON.stringify(quizData),
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        },
    });
};

export const useGetQuiz = (quizId: string) => {
    return useQuery({
        queryKey: ['quiz', quizId],
        queryFn: () => apiFetch(`quizzes/${quizId}`),
        enabled: !!quizId,
    });
};

export const useSubmitQuiz = () => {
    return useMutation({
        mutationFn: ({ quizId, answers }: { quizId: string, answers: any[] }) =>
            apiFetch(`quizzes/${quizId}/submit`, {
                method: 'POST',
                body: JSON.stringify({ answers }),
            }),
    });
};
export const useRegisterUser = () => {
    return useMutation({
        mutationFn: (credentials: any) =>
            apiFetch('users/register', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),
    });
};

export const useLoginUser = () => {
    return useMutation({
        mutationFn: (credentials: any) =>
            apiFetch('users/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),
    });
};

export const useGetMyAttempts = () => {
    return useQuery({
        queryKey: ['myAttempts'],
        queryFn: () => apiFetch('attempts'),
    });
};