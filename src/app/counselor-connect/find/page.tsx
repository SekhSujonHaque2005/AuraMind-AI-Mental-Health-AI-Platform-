
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, Star, Languages, MessageSquare, Phone, Video, MapPin, Mail, PhoneCall, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const counselorsByRegion = {
  "Maharashtra": [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=11',
      specialties: ['Anxiety', 'Depression', 'CBT'],
      description: 'A compassionate therapist with 10+ years of experience helping adults navigate life\'s challenges.',
      rating: 4.9,
      reviews: 142,
      verified: true,
      region: 'Mumbai, Maharashtra',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
    },
    {
      id: '4',
      name: 'Sameer Gupta',
      avatar: 'https://i.pravatar.cc/150?img=14',
      specialties: ['Career Counseling', 'Life Transitions'],
      description: 'Helps clients navigate career changes and major life decisions with clarity and confidence.',
      rating: 4.7,
      reviews: 85,
      verified: false,
      region: 'Pune, Maharashtra',
      email: 'sameer.gupta@example.com',
      phone: '+91 98765 43211',
    },
  ],
  "Delhi NCR": [
    {
      id: '2',
      name: 'Rohan Mehta',
      avatar: 'https://i.pravatar.cc/150?img=12',
      specialties: ['Stress Management', 'Relationships', 'Mindfulness'],
      description: 'Specializes in helping clients develop coping strategies for stress and improve communication.',
      rating: 4.8,
      reviews: 112,
      verified: true,
      region: 'Delhi, NCR',
      email: 'rohan.mehta@example.com',
      phone: '+91 98765 43212',
    },
  ],
  "Karnataka": [
      {
        id: '3',
        name: 'Dr. Ananya Reddy',
        avatar: 'https://i.pravatar.cc/150?img=13',
        specialties: ['Trauma', 'PTSD', 'Family Therapy'],
        description: 'An expert in trauma-informed care, providing a safe space for healing and growth.',
        rating: 5.0,
        reviews: 180,
        verified: true,
        region: 'Bangalore, Karnataka',
        email: 'ananya.reddy@example.com',
        phone: '+91 98765 43213',
      },
  ],
  "Telangana": [
     {
        id: '5',
        name: 'Dr. Aisha Khan',
        avatar: 'https://i.pravatar.cc/150?img=5',
        specialties: ['Cultural Identity', 'Mindfulness', 'Anxiety'],
        description: 'Focuses on culturally sensitive therapy, helping clients explore identity and belonging.',
        rating: 4.9,
        reviews: 130,
        verified: true,
        region: 'Hyderabad, Telangana',
        email: 'aisha.khan@example.com',
        phone: '+91 98765 43214',
      },
  ],
  "Tamil Nadu": [
     {
        id: '6',
        name: 'Vikram Singh',
        avatar: 'https://i.pravatar.cc/150?img=16',
        specialties: ['Grief & Loss', 'Depression'],
        description: 'Provides gentle and supportive guidance for individuals navigating grief and loss.',
        rating: 4.8,
        reviews: 95,
        verified: true,
        region: 'Chennai, Tamil Nadu',
        email: 'vikram.singh@example.com',
        phone: '+91 98765 43215',
      },
  ]
};

const allCounselors = Object.values(counselorsByRegion).flat();

export default function FindCounselorPage() {
  const router = useRouter();
  const [selectedCounselor, setSelectedCounselor] = useState(allCounselors[0]);
  const { toast } = useToast();
  
  const handleBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been confirmed, we will be connecting shortly.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
      </div>

      <aside className="w-full md:w-[350px] lg:w-[450px] border-r border-blue-500/10 p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-6">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 rounded-full"
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold text-white">Find a Counselor</h2>
        </div>
        <div className="overflow-y-auto pr-3 -mr-3 flex-grow no-scrollbar">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(counselorsByRegion).map(([region, counselors]) => (
                <div key={region}>
                    <h3 className="text-lg font-semibold text-blue-300 mb-3 px-2">{region}</h3>
                     <div className="space-y-4">
                        {counselors.map((counselor) => (
                        <motion.div key={counselor.id} variants={itemVariants}>
                            <Card
                            onClick={() => setSelectedCounselor(counselor)}
                            className={`cursor-pointer transition-all duration-300 bg-gray-900/50 border ${selectedCounselor.id === counselor.id ? 'border-blue-500 shadow-2xl shadow-blue-500/15' : 'border-blue-500/20 hover:border-blue-500/70 hover:bg-gray-800/60'}`}
                            >
                            <CardContent className="p-4 flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-2 border-blue-500/30">
                                <AvatarImage src={counselor.avatar} alt={counselor.name} />
                                <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                <h3 className="text-lg font-bold text-white truncate">{counselor.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-yellow-400">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span>{counselor.rating} ({counselor.reviews} reviews)</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {counselor.specialties.slice(0,2).map(spec => (
                                    <span key={spec} className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{spec}</span>
                                    ))}
                                </div>
                                </div>
                            </CardContent>
                            </Card>
                        </motion.div>
                        ))}
                    </div>
                </div>
            ))}
          </motion.div>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 flex items-center justify-center">
        {selectedCounselor && (
          <motion.div
            key={selectedCounselor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-black/20 backdrop-blur-lg border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10">
              <CardHeader className="text-center items-center p-8">
                <Avatar className="h-32 w-32 mb-4 border-4 border-blue-500/30">
                  <AvatarImage src={selectedCounselor.avatar} alt={selectedCounselor.name} />
                  <AvatarFallback className="text-4xl">{selectedCounselor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-3">
                    <CardTitle className="text-3xl font-bold text-white">{selectedCounselor.name}</CardTitle>
                    {selectedCounselor.verified && (
                        <div className="flex items-center gap-1.5 text-green-400">
                            <Check className="h-6 w-6"/>
                            <span className="font-semibold">Verified</span>
                        </div>
                    )}
                </div>
                 <div className="flex items-center gap-2 text-gray-400 mt-2">
                    <MapPin className="h-5 w-5"/>
                    <span>{selectedCounselor.region}</span>
                </div>
                <div className="flex items-center gap-2 text-lg text-yellow-400 mt-1">
                    <Star className="h-5 w-5 fill-current" />
                    <span>{selectedCounselor.rating} ({selectedCounselor.reviews} reviews)</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 space-y-6">
                <p className="text-center text-gray-300 text-base">{selectedCounselor.description}</p>
                
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCounselor.specialties.map(spec => (
                        <span key={spec} className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{spec}</span>
                    ))}
                  </div>
                </div>

                 <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 flex items-center gap-2"><Languages className="h-4 w-4"/> English</span>
                     <span className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 flex items-center gap-2"><Languages className="h-4 w-4"/> Hindi</span>
                  </div>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-3 text-lg">Contact Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href={`mailto:${selectedCounselor.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/60 transition-colors border border-gray-600/50">
                            <Mail className="h-5 w-5 text-blue-300"/>
                            <span className="text-gray-300">{selectedCounselor.email}</span>
                        </a>
                         <a href={`tel:${selectedCounselor.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/60 transition-colors border border-gray-600/50">
                            <PhoneCall className="h-5 w-5 text-blue-300"/>
                            <span className="text-gray-300">{selectedCounselor.phone}</span>
                        </a>
                    </div>
                </div>

              </CardContent>
              <CardFooter className="p-8 flex flex-col gap-3">
                 <Button size="lg" className="w-full text-lg py-7 bg-blue-600 hover:bg-blue-500" onClick={handleBooking}>
                    Book a Session
                 </Button>
                 <p className="text-xs text-gray-500 text-center">You will be taken to a secure portal to schedule and pay for your session.</p>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}
