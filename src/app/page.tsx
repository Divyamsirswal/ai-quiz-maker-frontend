"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { ArrowRight, BrainCircuit, CheckCircle, Gamepad2, Lightbulb, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 ${className}`}>
    {children}
  </div>
);


export default function HomePage() {
  const token = useAuthStore((state) => state.token);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <main className="flex-1">
        <section className="relative w-full py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 grid-pattern-bg"></div>

          <div className="container mx-auto text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                try it now
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-black to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-400"
            >
              Create AI-Powered Quizzes in Seconds.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[700px] mx-auto text-lg text-slate-600 dark:text-slate-400 md:text-xl mb-8"
            >
              Transform any subject into an engaging learning experience. Our AI crafts unique quizzes, so you can focus on what matters most.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center items-center gap-4"
            >
              <Button asChild size="lg" className="gap-2 shine-button">
                {isClient && (
                  token ? (
                    <Link href="/create-quiz">Go to Dashboard <ArrowRight className="h-4 w-4" /></Link>
                  ) : (
                    <Link href="/signup">Get Started for Free <ArrowRight className="h-4 w-4" /></Link>
                  )
                )}
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="w-full pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <BentoCard className="lg:col-span-2">
                <div className="absolute top-0 left-0 h-full w-full bento-glow bg-gradient-to-br from-primary/20 via-transparent to-transparent"></div>
                <BrainCircuit className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Intelligent Generation</h3>
                <p className="text-slate-600 dark:text-slate-400">Our AI understands context, creating relevant questions with multiple difficulty levels, not just random facts.</p>
              </BentoCard>
              <BentoCard>
                <Zap className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Blazing Fast</h3>
                <p className="text-slate-600 dark:text-slate-400">Quizzes are generated in a fraction of the time of other tools.</p>
              </BentoCard>
              <BentoCard>
                <Gamepad2 className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Engaging UI</h3>
                <p className="text-slate-600 dark:text-slate-400">A clean, interactive interface makes taking quizzes a fun experience.</p>
              </BentoCard>
              <BentoCard className="lg:col-span-2">
                <Lightbulb className="h-8 w-8 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
                <p className="text-slate-600 dark:text-slate-400">Users get their scores and see the correct answers immediately after submission, reinforcing learning.</p>
              </BentoCard>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-28 bg-slate-50 dark:bg-black">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Create Your First Quiz?</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
              Join thousands of creators and start building engaging quizzes in less than a minute.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="gap-2 shine-button">
                {isClient && (
                  token ? (
                    <Link href="/create-quiz">Go to Dashboard <ArrowRight className="h-4 w-4" /></Link>
                  ) : (
                    <Link href="/signup">Start Creating Now <ArrowRight className="h-4 w-4" /></Link>
                  )
                )}
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
            <p className="max-w-xl mx-auto text-center text-muted-foreground mb-12">
              Start for free and experience the full power of AI quiz generation.
            </p>
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Hobby</CardTitle>
                  <CardDescription>For individuals and personal projects.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-5xl font-bold mb-6">
                    $0 <span className="text-lg font-normal text-muted-foreground">/ month</span>
                  </p>
                  <ul className="space-y-4 text-left w-full">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Unlimited Quizzes
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      AI-Powered Question Generation
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Instant Scoring & Results
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild size="lg" className="w-full gap-2 shine-button">
                    {isClient && (token ?
                      <Link href="/create-quiz">Go to Dashboard</Link> :
                      <Link href="/signup">Start for Free</Link>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is the quiz builder really free to use?</AccordionTrigger>
                <AccordionContent>
                  Yes, absolutely. The current version of our AI Quiz Builder is completely free for personal use. We may introduce premium plans with advanced features in the future.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What kind of topics can I create quizzes on?</AccordionTrigger>
                <AccordionContent>
                  You can create a quiz on virtually any topic imaginable. Our AI is trained on a vast range of subjects, from history and science to pop culture and technical skills.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How many questions are generated per quiz?</AccordionTrigger>
                <AccordionContent>
                  By default, the AI generates 6 questions per quiz (2 easy, 2 medium, and 2 hard) to provide a balanced challenge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I share the quizzes I create?</AccordionTrigger>
                <AccordionContent>
                  While the current version focuses on personal quiz creation and taking, public sharing is a top-priority feature on our roadmap!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto p-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI Quiz Builder. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}