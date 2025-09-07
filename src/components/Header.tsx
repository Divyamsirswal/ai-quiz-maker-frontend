"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Header() {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="border-b w-full">
            <div className="container mx-auto px-10 flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                    AI Quiz Builder
                </Link>
                <nav>
                    {token ? (
                        <div className="flex items-center gap-4">
                            <Button asChild variant="ghost">
                                <Link href="/vault">My Vault</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/create-quiz">Create Quiz</Link>
                            </Button>
                            <Button onClick={handleLogout} variant="secondary">Logout</Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Button asChild variant="ghost">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}