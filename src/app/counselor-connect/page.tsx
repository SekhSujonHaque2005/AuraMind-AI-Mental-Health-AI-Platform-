
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Star, Users, MessageSquare, Phone, Video, PlayCircle, ArrowRight, AlertTriangle, Calendar, Search } from 'lucide-react';
import TextType from '@/components/ui/text-type';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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


const FeaturePill = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
    <motion.div variants={itemVariants} className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
        <Icon className="h-6 w-6 text-green-300" />
        <span className="text-gray-200">{text}</span>
    </motion.div>
);

export default function CounselorConnectPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleComingSoon = () => {
        toast({
            title: 'Coming Soon!',
            description: 'This feature is currently under development.',
        });
    };
    
    const howItWorksSteps = [
        {
          icon: Search,
          title: "Find Your Counselor",
          description: "Browse our network of certified professionals. Filter by specialty, language, and availability to find the right match for you."
        },
        {
          icon: Calendar,
          title: "Book Your Session",
          description: "Select a time that works for you and choose your preferred communication method: chat, audio, or video."
        },
        {
          icon: PlayCircle,
          title: "Begin Your Journey",
          description: "Join your secure, private session from any device and start your conversation with a trusted professional."
        }
      ];

    return (
        <div className="min-h-screen text-white overflow-x-hidden">
             <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
            </div>

            <section className="relative flex flex-col items-center pt-32 md:pt-48 min-h-screen px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="z-10 text-center"
                >
                    <TextType
                        as="h1"
                        text="Connect with a Real Counselor, Anonymously."
                        typingSpeed={50}
                        loop={false}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 mb-6"
                    />
                    <TextType
                        text="Schedule secure and private sessions with licensed therapists via chat, audio, or video. You're not alone."
                        typingSpeed={20}
                        initialDelay={2500}
                        loop={false}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10"
                    />
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-lg py-7 px-8 rounded-full transition-transform transform hover:scale-105" onClick={handleComingSoon}>
                            Book a Session
                        </Button>
                    </div>
                </motion.div>
            </section>

             <section className="pt-0 pb-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
                    <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">A simple, confidential path to professional support.</p>
                    <motion.div 
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {howItWorksSteps.map((step, index) => (
                           <motion.div key={index} variants={itemVariants}>
                               <Card className="relative h-full text-left bg-gray-900/50 border border-blue-500/20 rounded-2xl overflow-hidden p-8 transition-all hover:border-blue-500/50 hover:-translate-y-2">
                                    <div className="absolute top-0 right-0 text-[8rem] font-bold text-blue-500/5 opacity-50 -translate-y-4 translate-x-4">
                                        0{index + 1}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6">
                                            <step.icon className="w-8 h-8 text-blue-300"/>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-gray-400">{step.description}</p>
                                    </div>
                               </Card>
                           </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

             <section className="py-20 px-4 bg-black/20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Counselors</h2>
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                         variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                       <FeaturePill icon={CheckCircle} text="Certified & Verified Professionals" />
                       <FeaturePill icon={ShieldCheck} text="100% Private & Encrypted" />
                       <FeaturePill icon={Star} text="Affordable & Flexible Pricing" />
                       <FeaturePill icon={Users} text="Available 24/7, Globally" />
                    </motion.div>
                </div>
            </section>
            
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <ShieldCheck className="h-16 w-16 mx-auto text-green-400 mb-6"/>
                    <h2 className="text-4xl font-bold mb-4">Your Safety and Confidentiality</h2>
                    <p className="text-lg text-gray-400 mb-8">
                        Your privacy matters. All sessions are encrypted from end-to-end to ensure your conversations remain completely private and secure. We are committed to upholding the highest standards of data protection, aligning with HIPAA and GDPR guidelines.
                    </p>
                    <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-6 rounded-2xl max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-3">
                            <AlertTriangle className="h-6 w-6"/>
                            <h4 className="font-semibold text-lg">Emergency Disclaimer</h4>
                        </div>
                        <p className="mt-3 text-red-300">
                           If you are in a crisis or any other person may be in danger, don't use this site. Please call <a href="tel:911" className="font-bold underline hover:text-white">911</a> or refer to our <a href="/resources" className="font-bold underline hover:text-white">emergency resources page</a> to get immediate help.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take the next step?</h2>
                <div className="flex justify-center gap-4">
                     <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-xl py-8 px-10 rounded-full transition-transform transform hover:scale-105" onClick={handleComingSoon}>
                        Schedule a Session <ArrowRight className="ml-3 h-6 w-6"/>
                    </Button>
                </div>
            </section>

        </div>
    );
}
