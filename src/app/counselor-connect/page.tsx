
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, Star, Users, MessageSquare, Phone, Video, PlayCircle, ArrowRight, AlertTriangle, Calendar, Search, Globe, DollarSign, ExternalLink, School, Send } from 'lucide-react';
import TextType from '@/components/ui/text-type';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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


const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <motion.div variants={itemVariants}>
        <div className="relative h-full p-6 rounded-2xl bg-gray-900/50 border border-blue-500/20 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-blue-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{description}</p>
             </div>
        </div>
    </motion.div>
);

const UniversitySubmissionForm = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({ universityName: '', universityLink: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.universityName || !formData.universityLink) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please provide both the university name and the link.',
            });
            return;
        }

        setIsSubmitting(true);
        const submissionData = {
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
            subject: "New University Resource Submission from AuraMind",
            ...formData,
        };

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(submissionData)
              });

            const result = await res.json();
            if (result.success) {
                toast({
                    title: 'Submission Received!',
                    description: "Thank you for helping us grow our resource library.",
                });
                setFormData({ universityName: '', universityLink: '', email: '' });
            } else {
                console.error("Web3Forms submission error:", result.message);
                toast({
                    variant: 'destructive',
                    title: 'Submission Failed',
                    description: result.message || 'There was an error sending your submission.',
                });
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast({
                variant: 'destructive',
                title: 'Submission Error',
                description: 'An unexpected error occurred. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl bg-gray-900/50 border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <CardHeader>
                <CardTitle className="text-2xl text-blue-300">Suggest a University</CardTitle>
                <CardDescription className="text-gray-400">If your university isn't listed, please share the link to its counseling service portal. We'll review it and add it to our resources.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="universityName" className="text-gray-300">University Name</Label>
                        <Input
                            id="universityName"
                            name="universityName"
                            type="text"
                            placeholder="e.g., University of Delhi"
                            value={formData.universityName}
                            onChange={handleChange}
                            className="bg-gray-800/60 border-blue-500/30"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="universityLink" className="text-gray-300">Counseling Portal Link</Label>
                        <Input
                            id="universityLink"
                            name="universityLink"
                            type="url"
                            placeholder="https://example.edu/counseling"
                            value={formData.universityLink}
                            onChange={handleChange}
                            className="bg-gray-800/60 border-blue-500/30"
                            required
                        />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Your Email (Optional)</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="So we can thank you!"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-800/60 border-blue-500/30"
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white w-full py-3 text-base">
                        {isSubmitting ? 'Submitting...' : 'Submit Resource'}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};


export default function CounselorConnectPage() {
    const router = useRouter();
    
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

      const whyChooseUsFeatures = [
        {
          icon: CheckCircle,
          title: "Certified Professionals",
          description: "Every counselor is licensed, accredited, and rigorously vetted to ensure you receive the highest quality of care."
        },
        {
          icon: ShieldCheck,
          title: "100% Private & Encrypted",
          description: "Your conversations are protected with end-to-end encryption, ensuring your privacy is always maintained."
        },
        {
          icon: DollarSign,
          title: "Affordable & Flexible",
          description: "Access professional support without the high costs of traditional therapy. Choose a plan that fits your budget."
        },
        {
          icon: Globe,
          title: "Available Globally, 24/7",
          description: "Connect with a counselor from anywhere in the world, at any time that suits your schedule."
        }
    ];

    const universityResources = [
        { name: 'Lovely Professional University (LPU), Punjab', link: 'https://www.lpu.in/inst-performance/counselling-and-happiness-department.php' },
        { name: 'Punjab Engineering College (PEC), Chandigarh', link: 'https://pec.ac.in/student-counselling-cell' },
        { name: 'Central University of Punjab (CUP), Bathinda', link: 'https://www.cup.edu.in/students_counselling_cell.php' },
        { name: 'Panjab University (PU), Chandigarh', link: 'https://archive.iqac.puchd.ac.in/docs/2014/20141005100701-06-pu-ssr-ii.pdf' },
        { name: 'IIT Delhi', link: 'https://bsw.iitd.ac.in/mental_health.php' },
        { name: 'IIT Kanpur', link: 'https://iitk.ac.in/counsel/' },
        { name: 'IIT Bombay', link: 'https://www.iitb.ac.in/swc/en/online-counselling' },
        { name: 'IIT Guwahati', link: 'https://www.indiatoday.in/education-today/news/story/saathi-counselling-club-iit-guwahatis-commitment-to-student-mental-health-2445414-2023-10-06' },
        { name: 'IIT Kharagpur', link: 'https://timesofindia.indiatimes.com/city/kolkata/in-a-first-among-iits-kgp-campus-gets-dean-of-well-being-to-take-care-of-students-wellness/articleshow/123195624.cms' },
        { name: 'IIT Madras', link: 'https://www.iitm.ac.in/counselling-centre' },
        { name: 'IIT (BHU) Varanasi', link: 'https://iitbhu.ac.in/contents/institute/admin/doc/admin_mental_support.pdf' },
        { name: 'Banaras Hindu University (BHU), Varanasi', link: 'https://www.iitbhu.ac.in/contents/institute/admin/doc/admin_mental_support.pdf' },
        { name: 'Delhi University (DU)', link: 'http://www.du.ac.in/uploads/COVID-19/27042020_DU_CARE.pdf' },
        { name: 'Gargi College (DU)', link: 'https://www.gargi.du.ac.in/mental-health-and-counselling/' },
        { name: 'Shri Ram College of Commerce (SRCC, DU)', link: 'https://manodarpan.education.gov.in/' },
        { name: 'Jawaharlal Nehru University (JNU), Delhi', link: 'https://www.jnu.ac.in/healthcentre' },
        { name: 'Amity University, Mumbai', link: 'https://www.amity.edu/mumbai/' },
        { name: 'University of Mumbai', link: 'https://www.indiatoday.in/education-today/news/story/mumbai-university-launched-helpline-number-for-counselling-agitated-students-1677457-2020-05-13' },
        { name: 'Manonmaniam Sundaranar University, Tamil Nadu', link: 'https://www.msuniv.ac.in/' },
        { name: 'Vidyashilp University, Karnataka', link: 'https://www.vidyashilp.edu.in/' },
        { name: 'IIHMR Delhi', link: 'https://www.iihmrdelhi.edu.in/about-us/facilities/counselling' },
        { name: 'Lucknow University', link: 'https://www.lkouniv.ac.in/' },
    ];


    return (
        <div className="min-h-screen text-white overflow-x-hidden">
             <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
            </div>

            <section className="relative flex flex-col items-center pt-32 md:pt-40 min-h-[90vh] px-4">
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
                        initialDelay={3500}
                        loop={false}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-10"
                    />
                    <div className="flex justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-lg py-7 px-8 rounded-full transition-transform transform hover:scale-105" onClick={() => router.push('/counselor-connect/find')}>
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

             <section className="pb-20 px-4 bg-black/20">
                <div className="max-w-6xl mx-auto text-center py-20">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our Counselors</h2>
                    <motion.div 
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 group"
                         variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {whyChooseUsFeatures.map((feature, index) => (
                            <FeatureCard 
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
            
            <section className="pb-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-center mb-4">University & College Resources</h2>
                    <p className="text-lg text-gray-400 mb-16 max-w-3xl mx-auto">
                        Many universities offer free and confidential counseling services to their students. Check out the resources at your institution.
                    </p>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {universityResources.map((resource, index) => (
                            <motion.a 
                                key={index} 
                                href={resource.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                variants={itemVariants}
                                className="block"
                            >
                                <Card className="h-full text-left bg-gray-900/50 border border-blue-500/20 rounded-2xl p-6 transition-all hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                                <School className="w-6 h-6 text-blue-300"/>
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{resource.name}</h3>
                                        </div>
                                        <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-blue-300 transition-colors"/>
                                    </div>
                                </Card>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            <section className="pb-20 px-4">
                <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-center mb-4">Is Your University Missing?</h2>
                    <p className="text-lg text-gray-400 mb-8">
                        We're always expanding our list. If your university's counseling portal isn't here, please let us know by filling out the form below. We'll cover more universities soon!
                    </p>
                    <UniversitySubmissionForm />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-900/40">
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

             <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20">
                        <Image src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop" alt="Comforting background" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                        <div className="relative z-10 p-12 md:p-20 text-white">
                             <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to take the next step?</h2>
                             <p className="text-lg text-gray-200 mb-8 max-w-lg">Your journey to a healthier mind starts with a single conversation. We're here to help.</p>
                             <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white text-xl py-8 px-10 rounded-full transition-transform transform hover:scale-105" onClick={() => router.push('/counselor-connect/find')}>
                                Schedule a Session <ArrowRight className="ml-3 h-6 w-6"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
