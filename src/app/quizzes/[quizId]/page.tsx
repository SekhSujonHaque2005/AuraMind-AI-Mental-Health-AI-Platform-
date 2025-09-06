

'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useMemo, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Repeat, Brain, Award, ArrowLeft, Printer, Share2 } from 'lucide-react';
import type { Question } from '@/app/quizzes/types';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';


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
      <div className="text-xl md:text-2xl text-center font-bold text-violet-300">
        {question.question}
      </div>
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

const CertificateView = ({
  score,
  total,
  quizTitle,
  userName,
  onRestart,
}: {
  score: number;
  total: number;
  quizTitle: string;
  userName: string;
  onRestart: () => void;
}) => {
    const percentage = Math.round((score / total) * 100);
    const date = format(new Date(), 'MMMM d, yyyy');

    const handleShare = async () => {
      try {
        if (navigator.share) {
            await navigator.share({
                title: 'Quiz Certificate',
                text: `I just completed the "${quizTitle}" quiz on AuraMind and scored ${score}/${total}!`,
                url: window.location.href
            });
        } else {
            alert('Web Share API is not supported in your browser.');
        }
      } catch (error) {
        console.error("Could not share:", error);
        alert(`Sharing failed. You can copy the page URL to share it.`);
      }
    };

    return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="flex flex-col h-full"
    >
        <div id="certificate" className="flex-grow p-4 md:p-8 bg-gray-900/50 rounded-t-lg border-x border-t border-violet-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 to-purple-900/10 opacity-50"></div>
             <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
            
            <div className="text-center space-y-4 border-2 border-yellow-300/40 p-6 md:p-8 rounded-lg relative bg-gray-900/80 backdrop-blur-sm h-full flex flex-col justify-center">
                <Award className="h-16 w-16 text-yellow-400 mx-auto absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 p-2 rounded-full border-4 border-yellow-300/40" />
                
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 to-amber-500 mt-4 tracking-tight">
                    Certificate of Completion
                </h2>
                
                <p className="text-gray-400 text-base">This certifies that</p>
                
                <p className="text-2xl md:text-3xl font-semibold text-white tracking-wider">{userName || 'A studious user'}</p>
                
                <p className="text-gray-400 text-base">has successfully completed the quiz</p>
                
                <h3 className="text-xl md:text-2xl font-bold text-violet-300">{quizTitle}</h3>

                <div className="pt-6 w-full max-w-sm mx-auto">
                    <div className="grid grid-cols-3 gap-4 text-center border-t border-violet-500/20 pt-6">
                        <div>
                            <p className="text-lg font-bold text-white">{score}/{total}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Score</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{percentage}%</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Result</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-white">{date}</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">Date</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CardFooter className="bg-gray-900/80 rounded-b-lg border-x border-b border-violet-500/20 p-4 flex justify-end gap-3 no-print">
             <Button variant="ghost" onClick={onRestart}>
                <Repeat className="mr-2 h-4 w-4" />
                Take Another Quiz
            </Button>
            <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500">
                <Printer className="mr-2 h-4 w-4" />
                Print Certificate
            </Button>
             <Button onClick={handleShare} className="bg-green-600 hover:bg-green-500">
                <Share2 className="mr-2 h-4 w-4" />
                Share
            </Button>
        </CardFooter>

        <style jsx global>{`
            @media print {
                body * {
                    visibility: hidden;
                }
                #certificate, #certificate * {
                    visibility: visible;
                }
                #certificate {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    border: none !important;
                    margin: 0;
                    padding: 0;
                    background-color: #111827 !important; /* bg-gray-900 */
                    -webkit-print-color-adjust: exact; 
                    print-color-adjust: exact;
                }
                 .no-print {
                    display: none !important;
                 }
            }
        `}</style>
    </motion.div>
    );
};


export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.quizId as string;
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [userName, setUserName] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  
  useEffect(() => {
      let quizData: QuizData | null = null;
      if(quizId in staticQuizData) {
          quizData = staticQuizData[quizId as keyof typeof staticQuizData];
      } else {
          const storedQuiz = sessionStorage.getItem(`quiz-${quizId}`);
          if(storedQuiz) {
              const parsedData = JSON.parse(storedQuiz);
              quizData = { title: parsedData.title, questions: parsedData.questions };
          }
      }
      
      if(quizData) {
          setQuiz(quizData);
      } else {
          notFound();
      }
  }, [quizId]);


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
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
      setIsNameModalOpen(true);
    }
  };

  const handleShowCertificate = () => {
      setIsNameModalOpen(false);
      setShowResults(true);
  }

  const calculateScore = () => {
    return quiz.questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.answer ? 1 : 0);
    }, 0);
  };
  
  const handleRestart = () => {
      setShowResults(false);
      setTimeout(() => {
          router.push('/quizzes');
      }, 300)
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex] || "";
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  return (
    <>
    <div className="flex items-center justify-center min-h-full w-full p-4 md:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full no-print">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#a78bfa33,transparent)]"></div>
      </div>
      <Card className="w-full max-w-2xl bg-transparent border-none shadow-none min-h-[550px] relative">
         <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push('/quizzes')}
            className="absolute top-0 left-0 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200 rounded-full no-print"
        >
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <AnimatePresence mode="wait">
          {showResults ? (
            <CertificateView
                score={calculateScore()}
                total={quiz.questions.length}
                quizTitle={quiz.title}
                userName={userName}
                onRestart={handleRestart}
            />
          ) : (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              className="bg-gray-900/50 border border-violet-500/20 shadow-2xl rounded-lg"
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
    
    <Dialog open={isNameModalOpen} onOpenChange={setIsNameModalOpen}>
        <DialogContent className="bg-gray-900 border-violet-500/40 text-white no-print">
            <DialogHeader>
                <DialogTitle className="text-2xl text-violet-300">Congratulations!</DialogTitle>
                <DialogDescription>
                    You've completed the quiz. Please enter your name to appear on the certificate.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                 <Label htmlFor="name" className="text-gray-400">Name for Certificate</Label>
                 <Input 
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className="bg-gray-800/60 border-violet-500/30 text-gray-200 focus:ring-violet-500 mt-2"
                 />
            </div>
            <DialogFooter>
                <Button onClick={handleShowCertificate} className="bg-violet-600 hover:bg-violet-700 text-white">Generate Certificate</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
