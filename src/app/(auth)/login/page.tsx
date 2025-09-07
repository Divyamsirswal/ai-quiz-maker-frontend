"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUser } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function LoginPage() {
    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useLoginUser();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    setToken(data.token);
                    toast.success("Login successful! Welcome back.");
                    router.push("/");
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            }
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}