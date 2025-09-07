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
import { useRegisterUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";


export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useRegisterUser();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("Account created successfully! Please log in.");
                    router.push("/login");
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
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create a new account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="grid gap-4">
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
                            {mutation.isPending ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}