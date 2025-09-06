
'use client';

import { useParams, notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// In a real app, you would fetch this data from a CMS or database
const quizData: any = {
  'cbt-basics': {
    title: 'CBT Basics Quiz',
    questions: [], // We will add questions later
  },
  'mindfulness-check': {
    title: 'Mindfulness Check-in',
    questions: [],
  },
  'emotional-iq': {
    title: 'Emotional IQ Quiz',
    questions: [],
  },
};


export default function QuizPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const quiz = quizData[quizId];

  if (!quiz) {
    notFound();
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
       <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#a78bfa33,transparent)]"></div>
        </div>
      <Card className="w-full max-w-2xl bg-gray-900/50 border border-violet-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-purple-600">
            {quiz.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-300">
          <p className="text-lg">This quiz is under construction.</p>
          <p className="mt-2">Come back soon to test your knowledge!</p>
          <Button asChild className="mt-8 bg-violet-600 hover:bg-violet-500 text-white">
            <Link href="/quizzes">Back to Quizzes</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
