
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useMemo, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Repeat, Brain, Award, ArrowLeft } from 'lucide-react';
import type { Question } from '@/app/quizzes/types';


const staticQuizData: Record<string, {title: string; questions: Question[]}> = {
  'cbt-basics': {
    title: 'CBT Basics Quiz',
    questions: [
      {
        question: 'What does CBT stand for?',
        options: ['Cognitive Behavioral Therapy', 'Creative Brain Training', 'Critical Belief Testing', 'Calm Body Techniques'],
        answer: 'Cognitive Behavioral Therapy',
      },
      {
        question: 'Which of the following is a core principle of CBT?',
        options: [
          'Psychological problems are based, in part, on unhelpful ways of thinking.',
          'Childhood events are the sole cause of adult problems.',
          'Medication is always the first step.',
          'Ignoring problems will make them go away.',
        ],
        answer: 'Psychological problems are based, in part, on unhelpful ways of thinking.',
      },
      {
        question: 'What is a "thought record" used for in CBT?',
        options: [
          'To document and challenge automatic negative thoughts.',
          'To write down your dreams.',
          'To keep a diary of daily events.',
          'To list your favorite memories.',
        ],
        answer: 'To document and challenge automatic negative thoughts.',
      },
      {
        question: 'The "C" in CBT focuses on what?',
        options: ['Cognitions (thoughts)', 'Conditions', 'Choices', 'Consequences'],
        answer: 'Cognitions (thoughts)',
      },
      {
        question: 'Which technique involves gradually facing a feared situation?',
        options: ['Exposure Therapy', 'Thought Stopping', 'Positive Affirmations', 'Dream Analysis'],
        answer: 'Exposure Therapy',
      },
    ],
  },
  'mindfulness-check': {
    title: 'Mindfulness Check-in',
    questions: [
      {
        question: 'What is the primary goal of mindfulness?',
        options: ['To empty your mind of all thoughts.', 'To pay attention to the present moment without judgment.', 'To analyze your thoughts to find their root cause.', 'To achieve a state of deep relaxation only.'],
        answer: 'To pay attention to the present moment without judgment.',
      },
      {
        question: 'Which of these is a common mindfulness practice?',
        options: ['Watching TV', 'Planning your week', 'Mindful breathing', 'Scrolling through social media'],
        answer: 'Mindful breathing',
      },
      {
        question: 'During mindfulness, if you notice your mind has wandered, what should you do?',
        options: ['Gently guide your attention back to your breath or anchor.', 'Feel frustrated with yourself for losing focus.', 'Stop the exercise and try again later.', 'Try to force the distracting thoughts away.'],
        answer: 'Gently guide your attention back to your breath or anchor.',
      },
      {
        question: 'Mindfulness can be practiced while doing which activity?',
        options: ['Eating', 'Walking', 'Washing dishes', 'All of the above'],
        answer: 'All of the above',
      },
      {
        question: 'What does the "non-judgment" aspect of mindfulness mean?',
        options: ['Observing your thoughts and feelings without labeling them as "good" or "bad".', 'Deciding which thoughts are helpful and which are not.', 'Ignoring all negative emotions.', 'Agreeing with all of your thoughts.'],
        answer: 'Observing your thoughts and feelings without labeling them as "good" or "bad".',
      },
    ],
  },
  'emotional-iq': {
    title: 'Emotional IQ Quiz',
    questions: [
      {
        question: 'What is Emotional Intelligence (EQ)?',
        options: [
          'The ability to understand, use, and manage your own emotions.',
          'Being able to suppress your emotions.',
          'How smart you are in traditional academics.',
          'Your ability to be happy all the time.',
        ],
        answer: 'The ability to understand, use, and manage your own emotions.',
      },
      {
        question: 'Which of the following is a key component of EQ?',
        options: ['Self-awareness', 'High IQ', 'Physical strength', 'Being extroverted'],
        answer: 'Self-awareness',
      },
      {
        question: 'What is empathy?',
        options: ['The ability to understand and share the feelings of another.', 'Feeling sorry for someone.', 'Offering advice to solve someone\'s problems.', 'Agreeing with everything someone says.'],
        answer: 'The ability to understand and share the feelings of another.',
      },
      {
        question: 'If you feel angry, what is an emotionally intelligent response?',
        options: [
          'Taking a moment to identify why you feel angry before reacting.',
          'Immediately lashing out at the source of your anger.',
          'Pretending you are not angry.',
          'Blaming someone else for making you angry.',
        ],
        answer: 'Taking a moment to identify why you feel angry before reacting.',
      },
      {
        question: 'Why is it important to be able to label your specific emotions?',
        options: [
          'It helps you understand what you are feeling and why.',
          'It is not important.',
          'So you can tell others how you feel.',
          'To prove you are emotionally stable.',
        ],
        answer: 'It helps you understand what you are feeling and why.',
      },
    ],
  },
  'anxiety-assessment': {
    title: 'Anxiety Self-Assessment',
    questions: [
      {
        question: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        answer: 'Nearly every day',
      },
      {
        question: 'How often have you been bothered by not being able to stop or control worrying?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        answer: 'Nearly every day',
      },
      {
        question: 'How often have you been bothered by worrying too much about different things?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        answer: 'Nearly every day',
      },
      {
        question: 'How often have you been bothered by having trouble relaxing?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        answer: 'Nearly every day',
      },
      {
        question: 'How often have you been bothered by feeling afraid as if something awful might happen?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        answer: 'Nearly every day',
      },
    ],
  },
  'resilience-scale': {
    title: 'The Resilience Scale',
    questions: [
      {
        question: 'I tend to bounce back quickly after hard times.',
        options: ['Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        answer: 'Strongly Agree',
      },
      {
        question: 'I have a hard time making it through stressful events.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
        answer: 'Disagree',
      },
      {
        question: 'I tend to take a long time to recover from a stressful event.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
        answer: 'Disagree',
      },
      {
        question: 'It is hard for me to snap back when something bad happens.',
        options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree'],
        answer: 'Disagree',
      },
      {
        question: 'I usually come through difficult times with little trouble.',
        options: ['Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        answer: 'Strongly Agree',
      },
    ],
  },
};

interface QuizData {
    title: string;
    questions: Question[];
}

const QuestionCard = ({
  question,
  selectedOption,
  onOptionSelect,
}: {
  question: Question;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}) => (
  <motion.div
    key={question.question}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5, type: 'spring' }}
  >
    <CardHeader>
      <CardTitle className="text-xl md:text-2xl text-center font-bold text-violet-300">
        {question.question}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <RadioGroup value={selectedOption} onValueChange={onOptionSelect} className="space-y-4">
        {question.options.map((option) => (
          <motion.div
            key={option}
            whileHover={{ scale: 1.03 }}
            className="flex items-center space-x-3 p-4 bg-gray-800/50 border border-violet-500/20 rounded-lg hover:border-violet-400/50 transition-colors"
          >
            <RadioGroupItem value={option} id={option} className="h-5 w-5 border-violet-400 text-violet-500 focus:ring-violet-500" />
            <Label htmlFor={option} className="text-base text-gray-300 cursor-pointer flex-1">{option}</Label>
          </motion.div>
        ))}
      </RadioGroup>
    </CardContent>
  </motion.div>
);

const ResultsCard = ({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) => {
  const percentage = Math.round((score / total) * 100);
  const resultMessage = useMemo(() => {
    if (percentage >= 80) return "Excellent! You have a strong understanding.";
    if (percentage >= 50) return "Good job! A little more reading could be helpful.";
    return "No worries! This is a great starting point for learning.";
  }, [percentage]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="text-center"
    >
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-purple-600">
          Quiz Complete!
        </CardTitle>
        <CardDescription className="text-gray-400 pt-2">{resultMessage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative flex justify-center items-center">
            <Award className="h-40 w-40 text-yellow-500/20" />
            <div className="absolute flex flex-col items-center">
                <p className="text-5xl font-bold text-white">{score}/{total}</p>
                <p className="text-2xl text-yellow-400">{percentage}%</p>
            </div>
        </div>
        <Button onClick={onRestart} className="w-full bg-violet-600 hover:bg-violet-500 text-white text-lg py-6">
          <Repeat className="mr-2 h-5 w-5" />
          Take Again
        </Button>
      </CardContent>
    </motion.div>
  );
};


export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  
  useEffect(() => {
      let quizData: QuizData | null = null;
      if(quizId in staticQuizData) {
          quizData = staticQuizData[quizId as keyof typeof staticQuizData];
      } else {
          // It's a dynamically generated quiz, get it from sessionStorage
          const storedQuiz = sessionStorage.getItem(`quiz-${quizId}`);
          if(storedQuiz) {
              const parsedData = JSON.parse(storedQuiz);
              quizData = { title: parsedData.title, questions: parsedData.questions };
          }
      }
      
      if(quizData) {
          setQuiz(quizData);
      } else {
          // If no quiz data is found after checking both, it's a 404
          notFound();
      }
  }, [quizId]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    // You can return a loading spinner here while waiting for the effect to run
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
            <Brain className="h-16 w-16 text-violet-400 animate-pulse" />
            <p className="text-violet-300 mt-4">Loading Quiz...</p>
        </div>
    );
  }

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.answer ? 1 : 0);
    }, 0);
  };
  
  const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex] || "";
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 md:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#a78bfa33,transparent)]"></div>
      </div>
      <Card className="w-full max-w-2xl bg-gray-900/50 border border-violet-500/20 shadow-2xl min-h-[450px] relative">
         <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/quizzes')}
            className="absolute top-4 left-4 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200 rounded-full"
        >
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <AnimatePresence mode="wait">
          {showResults ? (
            <ResultsCard 
                score={calculateScore()}
                total={quiz.questions.length}
                onRestart={handleRestart}
            />
          ) : (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedOption={selectedOption}
                onOptionSelect={handleOptionSelect}
              />
              <CardFooter className="justify-center p-6">
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="w-full md:w-1/2 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 disabled:text-gray-400 text-white text-lg py-6"
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
