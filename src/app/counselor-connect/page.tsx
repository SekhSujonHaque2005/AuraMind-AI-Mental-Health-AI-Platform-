
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Star, Users, MessageSquare, Phone, Video, PlayCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import TextType from '@/components/ui/text-type';
import { useRouter } from 'next/navigation';

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

    return (
        <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
            {/* Background Grid and Gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center h-screen min-h-[700px] text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300 mb-6">
                        Talk to a Counselor Anytime, Anywhere.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10">
                        Get instant access to certified mental health professionals through secure chat, audio, or video sessions.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-lg py-7 px-8 rounded-full transition-transform transform hover:scale-105" onClick={() => router.push('/consultant/persona')}>
                            Connect Now
                        </Button>
                         <Button size="lg" variant="outline" className="bg-transparent border-2 border-gray-600 hover:border-white hover:bg-white/10 text-white text-lg py-7 px-8 rounded-full transition-transform transform hover:scale-105">
                            Book a Session
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
                    <motion.div 
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center h-full">
                                <Users className="h-12 w-12 mx-auto text-blue-400 mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">Step 1: Choose a Counselor</h3>
                                <p className="text-gray-400">Browse our network of certified professionals or get matched based on your needs.</p>
                            </Card>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center h-full">
                                 <div className="flex justify-center gap-3 h-12 mb-4">
                                    <MessageSquare className="h-10 w-10 text-blue-400"/>
                                    <Phone className="h-10 w-10 text-blue-400"/>
                                    <Video className="h-10 w-10 text-blue-400"/>
                                 </div>
                                <h3 className="text-xl font-semibold mb-2">Step 2: Select Session Type</h3>
                                <p className="text-gray-400">Connect the way you feel most comfortable: via chat, audio, or video.</p>
                            </Card>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center h-full">
                                <PlayCircle className="h-12 w-12 mx-auto text-blue-400 mb-4"/>
                                <h3 className="text-xl font-semibold mb-2">Step 3: Start Your Session</h3>
                                <p className="text-gray-400">Begin your secure and private conversation instantly, right from your device.</p>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

             {/* Why Choose Us Section */}
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

            {/* Pricing Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Flexible Pricing Plans</h2>
                    <motion.div 
                        className="grid lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Free Trial Card */}
                        <motion.div variants={itemVariants}>
                             <Card className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-green-400">Free Trial</CardTitle>
                                    <CardDescription className="text-4xl font-bold text-white">First 10 mins</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-3">
                                    <li className="flex items-center gap-2 text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-green-400"/> Chat with a counselor
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-green-400"/> No commitment required
                                    </li>
                                </CardContent>
                                <Button variant="outline" className="w-full mt-6 bg-transparent border-green-500 text-green-400 hover:bg-green-500/10 hover:text-green-300">Start Free Chat</Button>
                            </Card>
                        </motion.div>

                        {/* On-Demand Card */}
                        <motion.div variants={itemVariants}>
                            <Card className="bg-blue-600/10 border-2 border-blue-500 p-8 rounded-2xl h-full flex flex-col shadow-2xl shadow-blue-500/10">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-blue-300">On-Demand</CardTitle>
                                    <CardDescription className="text-4xl font-bold text-white">Pay-Per-Session</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-3">
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-blue-300"/> Chat, Audio, or Video sessions</li>
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-blue-300"/> Choose your counselor</li>
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-blue-300"/> No subscription needed</li>
                                </CardContent>
                                 <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white">Choose a Session</Button>
                            </Card>
                        </motion.div>

                        {/* Premium Membership Card */}
                        <motion.div variants={itemVariants}>
                            <Card className="bg-white/5 border border-white/10 p-8 rounded-2xl h-full flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-purple-400">Premium Membership</CardTitle>
                                    <CardDescription className="text-4xl font-bold text-white">$49/month</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-3">
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-purple-400"/> Unlimited discounted sessions</li>
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-purple-400"/> Full access to AI wellness tools</li>
                                    <li className="flex items-center gap-2 text-gray-300"><CheckCircle className="h-5 w-5 text-purple-400"/> Priority booking</li>
                                </CardContent>
                                <Button variant="outline" className="w-full mt-6 bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300">Go Premium</Button>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            
            {/* Safety & Confidentiality */}
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

             {/* Final CTA */}
            <section className="py-24 px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to take the next step?</h2>
                <div className="flex justify-center gap-4">
                     <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-xl py-8 px-10 rounded-full transition-transform transform hover:scale-105" onClick={() => router.push('/consultant/persona')}>
                        Start Talking Now <ArrowRight className="ml-3 h-6 w-6"/>
                    </Button>
                </div>
            </section>

        </div>
    );
}
