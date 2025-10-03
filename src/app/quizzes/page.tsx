
'use client';

import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Puzzle, Lightbulb, ArrowRight, ShieldAlert, Mountain, PlusSquare, Wand2, Loader2, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import TextType from '@/components/ui/text-type';
import { useState, useTransition } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getAIGeneratedQuiz } from '@/app/actions';
import type { Question } from '@/app/quizzes/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Quiz {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    tags: string[];
    questions?: Question[]; 
}

const staticQuizzes: Quiz[] = [
  {
    id: 'cbt-basics',
    title: 'CBT Basics',
    description: 'Learn the fundamentals of Cognitive Behavioral Therapy and challenge negative thought patterns.',
    icon: Brain,
    tags: ['Therapy', 'Anxiety'],
  },
  {
    id: 'mindfulness-check',
    title: 'Mindfulness Check-in',
    description: 'Assess your present-moment awareness and discover areas for growth.',
    icon: Puzzle,
    tags: ['Mindfulness', 'Stress'],
  },
  {
    id: 'emotional-iq',
    title: 'Emotional IQ',
    description: 'Explore your emotional intelligence and learn how to better understand your feelings.',
    icon: Lightbulb,
    tags: ['Emotions', 'Self-Awareness'],
  },
   {
    id: 'anxiety-assessment',
    title: 'Anxiety Self-Assessment',
    description: 'A quick check-in to gauge your current anxiety levels based on common symptoms.',
    icon: ShieldAlert,
    tags: ['Anxiety', 'Self-Assessment'],
  },
  {
    id: 'resilience-scale',
    title: 'The Resilience Scale',
    description: 'Measure your ability to bounce back from adversity and identify areas to build mental toughness.',
    icon: Mountain,
    tags: ['Resilience', 'Strength'],
  },
];

const initialManualQuizState = {
  title: '',
  questions: [{ question: '', options: ['', '', '', ''], answer: '' }],
};

export default function QuizzesPage() {
  const router = useRouter();
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState('');
  const [isGenerating, startTransition] = useTransition();
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>(staticQuizzes);
  const [creationMode, setCreationMode] = useState<'ai' | 'manual' | null>(null);
  const [manualQuiz, setManualQuiz] = useState<{ title: string; questions: Question[] }>(initialManualQuizState);
  const { toast } = useToast();

  const handleStartQuiz = (quizId: string) => {
    const quizData = allQuizzes.find(q => q.id === quizId);
    if(quizData?.questions) {
        sessionStorage.setItem(`quiz-${quizId}`, JSON.stringify(quizData));
    }
    router.push(`/quizzes/${quizId}`);
  };

  const handleGenerateAiQuiz = () => {
    toast({title: "Coming Soon!", description: "AI quiz generation will be available in a future update."});
  }

  const handleManualQuestionChange = (qIndex: number, value: string) => {
    const newQuestions = [...manualQuiz.questions];
    newQuestions[qIndex].question = value;
    setManualQuiz(prev => ({ ...prev, questions: newQuestions }));
  };
  
  const handleManualOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...manualQuiz.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setManualQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleManualAnswerChange = (qIndex: number, value: string) => {
    const newQuestions = [...manualQuiz.questions];
    newQuestions[qIndex].answer = value;
    setManualQuiz(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleAddQuestion = () => {
    setManualQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, { question: '', options: ['', '', '', ''], answer: '' }]
    }));
  };

  const handleRemoveQuestion = (qIndex: number) => {
    if (manualQuiz.questions.length > 1) {
        const newQuestions = manualQuiz.questions.filter((_, index) => index !== qIndex);
        setManualQuiz(prev => ({ ...prev, questions: newQuestions }));
    }
  };

  const handleSaveManualQuiz = () => {
    if (!manualQuiz.title.trim()) {
        toast({ variant: 'destructive', title: 'Title is required.' });
        return;
    }
    if (manualQuiz.questions.some(q => !q.question.trim() || q.options.some(o => !o.trim()) || !q.answer)) {
        toast({ variant: 'destructive', title: 'All fields are required for each question.' });
        return;
    }

    const newQuiz: Quiz = {
        id: `manual-${Date.now()}`,
        title: manualQuiz.title,
        description: 'A custom quiz created by you.',
        icon: Puzzle,
        tags: ['Custom'],
        questions: manualQuiz.questions,
    };
    
    setAllQuizzes(prev => [...prev, newQuiz]);
    resetDialog();
    toast({ title: 'Quiz Saved!', description: `Your quiz "${newQuiz.title}" has been added.` });
  };


  const resetDialog = () => {
    setIsCreateQuizOpen(false);
    setCreationMode(null);
    setQuizTopic('');
    setManualQuiz(initialManualQuizState);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <>
    <div className="relative flex flex-col items-center p-4 md:p-8 overflow-x-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#a78bfa33,transparent)]"></div>
        </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center my-12 flex flex-col items-center"
      >
        <TextType
          as="h1"
          text="Mind Quizzes"
          typingSpeed={60}
          loop={false}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-purple-600"
        />
        <TextType
          text="Engage in insightful quizzes to better understand your mind and well-being."
          typingSpeed={20}
          initialDelay={1500}
          loop={false}
          className="text-lg max-w-2xl mx-auto text-gray-400"
        />
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {allQuizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={itemVariants}>
            <Card
              className="flex flex-col h-full bg-gray-900/50 border border-violet-500/20 hover:border-violet-500/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(167,139,250,0.25)] rounded-2xl overflow-hidden group"
            >
              <CardHeader className="p-8">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-fit p-4 bg-gray-800/70 rounded-xl mb-5 border-2 border-violet-500/20 group-hover:border-violet-400/50 transition-colors"
                >
                  <quiz.icon className="h-10 w-10 text-violet-300 group-hover:text-violet-200 transition-colors" />
                </motion.div>
                <CardTitle className="text-2xl text-violet-300">{quiz.title}</CardTitle>
                <CardDescription className="text-gray-400 pt-2 text-base min-h-[60px]">
                  {quiz.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter className="flex items-center justify-between p-6 bg-black/20 mt-auto">
                <div className="flex gap-2">
                    {quiz.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">{tag}</span>
                    ))}
                </div>
                <Button
                  className="bg-violet-600 hover:bg-violet-500 text-white transition-all group/button"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  Start Quiz
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover/button:opacity-100 group-hover/button:translate-x-0 transition-all duration-300" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        {/* Create Your Own Quiz Card */}
        <motion.div variants={itemVariants}>
            <Card
                onClick={() => setIsCreateQuizOpen(true)}
                className="cursor-pointer flex flex-col h-full items-center justify-center bg-gray-900/50 border-2 border-dashed border-violet-500/30 hover:border-violet-500/80 hover:bg-gray-900/80 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(167,139,250,0.25)] rounded-2xl group"
            >
                <div className="p-8 text-center">
                    <PlusSquare className="h-12 w-12 text-violet-400/70 mx-auto mb-4 transition-transform group-hover:rotate-12 group-hover:scale-110" />
                    <h3 className="text-2xl font-bold text-violet-300">Create Your Own Quiz</h3>
                    <p className="text-gray-400 mt-2">Design a quiz manually or let our AI help you build one on any topic.</p>
                </div>
            </Card>
        </motion.div>
      </motion.div>
    </div>

    <Dialog open={isCreateQuizOpen} onOpenChange={(isOpen) => !isOpen && resetDialog()}>
        <DialogContent className="bg-gray-900 border-violet-500/40 text-white max-w-3xl">
            <DialogHeader>
                <DialogTitle className="text-2xl text-violet-300">Create a New Quiz</DialogTitle>
                 {!creationMode && (
                    <DialogDescription>
                        How would you like to create your quiz?
                    </DialogDescription>
                 )}
            </DialogHeader>
            
            {!creationMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" onClick={handleGenerateAiQuiz}>
                        <Wand2 className="h-6 w-6" />
                        Generate with AI
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col gap-2" onClick={() => setCreationMode('manual')}>
                        <Puzzle className="h-6 w-6" />
                        Create Manually
                    </Button>
                </div>
            ) : creationMode === 'ai' ? (
                <div className="py-4 space-y-4">
                    <DialogDescription>Just provide a topic and our AI will generate a 5-question quiz for you.</DialogDescription>
                    <div className="space-y-2">
                        <Label htmlFor="quiz-topic" className="text-gray-400">Quiz Topic</Label>
                        <Input 
                            id="quiz-topic"
                            placeholder="e.g., 'The basics of stoicism'"
                            className="bg-gray-800/60 border-violet-500/30 text-gray-200 focus:ring-violet-500"
                            value={quizTopic}
                            onChange={(e) => setQuizTopic(e.target.value)}
                            disabled={isGenerating}
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="manual-quiz-title" className="text-lg">Quiz Title</Label>
                        <Input id="manual-quiz-title" value={manualQuiz.title} onChange={e => setManualQuiz(prev => ({ ...prev, title: e.target.value }))} placeholder="e.g., Weekly Mindfulness Check-in" className="bg-gray-800/60 border-violet-500/30"/>
                    </div>
                    <ScrollArea className="h-[40vh] pr-4">
                        <div className="space-y-6">
                        {manualQuiz.questions.map((q, qIndex) => (
                            <div key={qIndex} className="p-4 rounded-lg border border-violet-500/20 bg-black/20 space-y-4 relative">
                                <Label htmlFor={`q-${qIndex}`} className="text-base">Question {qIndex + 1}</Label>
                                <Input id={`q-${qIndex}`} value={q.question} onChange={e => handleManualQuestionChange(qIndex, e.target.value)} placeholder={`Enter question ${qIndex + 1}...`} className="bg-gray-800/60 border-violet-500/30"/>
                                <div className="space-y-3">
                                    <Label>Options & Correct Answer</Label>
                                    <RadioGroup value={q.answer} onValueChange={value => handleManualAnswerChange(qIndex, value)}>
                                    {q.options.map((opt, oIndex) => (
                                        <div key={oIndex} className="flex items-center gap-3">
                                            <RadioGroupItem value={opt} id={`q${qIndex}-o${oIndex}`} />
                                            <Input value={opt} onChange={e => handleManualOptionChange(qIndex, oIndex, e.target.value)} placeholder={`Option ${oIndex + 1}`} className="bg-gray-800/60 border-violet-500/30"/>
                                        </div>
                                    ))}
                                    </RadioGroup>
                                </div>
                                {manualQuiz.questions.length > 1 && (
                                    <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleRemoveQuestion(qIndex)}>
                                        <Trash2 className="h-4 w-4"/>
                                    </Button>
                                )}
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                    <Button variant="outline" onClick={handleAddQuestion} className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                </div>
            )}

            <DialogFooter>
                <Button variant="ghost" onClick={resetDialog}>Cancel</Button>
                {creationMode === 'ai' && (
                    <Button onClick={handleGenerateAiQuiz} className="bg-violet-600 hover:bg-violet-700 text-white" disabled={isGenerating}>
                        {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Wand2 className="mr-2 h-4 w-4" /> Generate with AI</>}
                    </Button>
                )}
                 {creationMode === 'manual' && (
                    <Button onClick={handleSaveManualQuiz} className="bg-violet-600 hover:bg-violet-700 text-white">
                        Save Quiz
                    </Button>
                )}
            </DialogFooter>
        </DialogContent>
    </Dialog>

    </>
  );
}
