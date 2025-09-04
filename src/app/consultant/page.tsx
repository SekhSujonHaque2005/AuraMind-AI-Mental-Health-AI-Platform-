
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Phone, DatabaseZap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ConsentItem = ({
  icon: Icon,
  id,
  checked,
  onCheckedChange,
  children,
}: {
  icon: React.ElementType;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
}) => (
    <motion.div
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="flex items-start space-x-4 p-5 rounded-xl bg-gray-800/50 border border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer"
      onClick={() => onCheckedChange(!checked)}
    >
        <div className="flex-shrink-0 mt-1">
             <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} className="h-5 w-5 border-blue-400 data-[state=checked]:bg-blue-500" />
        </div>
        <div className="flex-grow">
            <Label htmlFor={id} className="flex items-center text-base text-gray-300 cursor-pointer">
                 <Icon className="h-6 w-6 text-blue-400 mr-4" />
                {children}
            </Label>
        </div>
  </motion.div>
);


export default function ConsentPage() {
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);
  const router = useRouter();

  const allConsentsGiven = consent1 && consent2 && consent3;

  const handleContinue = () => {
    if (allConsentsGiven) {
      router.push('/consultant/persona');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-2xl bg-gray-900/50 border border-blue-500/20 shadow-[0_0_50px_rgba(72,149,239,0.15)] rounded-2xl">
        <CardHeader className="text-center p-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-3">
              AI Wellness Consultant
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Before we begin, please review and accept the following terms to ensure a safe and supportive experience.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <motion.div 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <ConsentItem icon={ShieldCheck} id="consent1" checked={consent1} onCheckedChange={setConsent1}>
                This is not medical advice. This is an AI wellness companion designed for supportive conversations.
              </ConsentItem>
            </motion.div>
             <motion.div variants={itemVariants}>
              <ConsentItem icon={Phone} id="consent2" checked={consent2} onCheckedChange={setConsent2}>
                If you are in a crisis, please call emergency services or a helpline immediately.
              </ConsentItem>
            </motion.div>
             <motion.div variants={itemVariants}>
              <ConsentItem icon={DatabaseZap} id="consent3" checked={consent3} onCheckedChange={setConsent3}>
                I understand that my data will be handled as per the privacy policy and I have control over it.
              </ConsentItem>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            <Button
              disabled={!allConsentsGiven}
              className="w-full mt-10 text-lg font-semibold py-7 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all group"
              onClick={handleContinue}
            >
              Accept and Continue
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-disabled:transform-none" />
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
