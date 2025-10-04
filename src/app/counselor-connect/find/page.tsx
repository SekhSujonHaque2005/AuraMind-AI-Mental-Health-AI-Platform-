
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, Star, Languages, Mail, PhoneCall, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingConfirmation from './booking-confirmation';
import { Dialog, DialogContent, DialogHeader, DialogTitle as RadixDialogTitle } from '@/components/ui/dialog';


const counselorsByRegion = {
  "Andhra Pradesh": [
    {
      id: 'ap1',
      name: 'Dr. Ramesh Kumar',
      avatar: 'https://i.pravatar.cc/150?img=21',
      specialties: ['Family Counseling', 'Stress'],
      description: 'Experienced in helping families and individuals manage stress and improve relationships.',
      rating: 4.8,
      reviews: 95,
      verified: true,
      region: 'Visakhapatnam, Andhra Pradesh',
      email: 'ramesh.kumar@example.com',
      phone: '+91 91234 56780',
    },
  ],
  "Arunachal Pradesh": [
    {
      id: 'ar1',
      name: 'Tenzin Dolma',
      avatar: 'https://i.pravatar.cc/150?img=22',
      specialties: ['Mindfulness', 'Youth Counseling'],
      description: 'Focuses on mindfulness techniques for young adults navigating life transitions.',
      rating: 4.7,
      reviews: 60,
      verified: false,
      region: 'Itanagar, Arunachal Pradesh',
      email: 'tenzin.dolma@example.com',
      phone: '+91 91234 56781',
    },
  ],
  "Assam": [
     {
      id: 'as1',
      name: 'Dr. Anjali Das',
      avatar: 'https://i.pravatar.cc/150?img=23',
      specialties: ['Anxiety', 'Depression'],
      description: 'Compassionate therapist helping clients manage anxiety with CBT techniques.',
      rating: 4.9,
      reviews: 110,
      verified: true,
      region: 'Guwahati, Assam',
      email: 'anjali.das@example.com',
      phone: '+91 91234 56782',
    },
  ],
  "Bihar": [
    {
      id: 'br1',
      name: 'Sanjay Singh',
      avatar: 'https://i.pravatar.cc/150?img=24',
      specialties: ['Career Counseling', 'Stress'],
      description: 'Dedicated to helping students and professionals navigate their career paths.',
      rating: 4.6,
      reviews: 80,
      verified: true,
      region: 'Patna, Bihar',
      email: 'sanjay.singh@example.com',
      phone: '+91 91234 56783',
    },
  ],
  "Chhattisgarh": [
    {
      id: 'cg1',
      name: 'Nisha Sahu',
      avatar: 'https://i.pravatar.cc/150?img=25',
      specialties: ['Relationship Counseling', 'CBT'],
      description: 'Specializes in helping couples and individuals build healthier relationships.',
      rating: 4.8,
      reviews: 90,
      verified: true,
      region: 'Raipur, Chhattisgarh',
      email: 'nisha.sahu@example.com',
      phone: '+91 91234 56784',
    },
  ],
  "Goa": [
     {
      id: 'ga1',
      name: 'Dr. Maria Fernandes',
      avatar: 'https://i.pravatar.cc/150?img=26',
      specialties: ['Life Transitions', 'Anxiety'],
      description: 'Offers a holistic approach to mental wellness, focusing on mind-body connection.',
      rating: 4.9,
      reviews: 130,
      verified: true,
      region: 'Panaji, Goa',
      email: 'maria.fernandes@example.com',
      phone: '+91 91234 56785',
    },
  ],
  "Gujarat": [
    {
      id: 'gj1',
      name: 'Dr. Kenil Patel',
      avatar: 'https://i.pravatar.cc/150?img=27',
      specialties: ['Stress Management', 'Mindfulness'],
      description: 'An expert in stress reduction techniques and mindfulness-based therapies.',
      rating: 4.8,
      reviews: 140,
      verified: true,
      region: 'Ahmedabad, Gujarat',
      email: 'kenil.patel@example.com',
      phone: '+91 91234 56786',
    },
  ],
  "Haryana": [
     {
      id: 'hr1',
      name: 'Pooja Singh',
      avatar: 'https://i.pravatar.cc/150?img=28',
      specialties: ['Youth Counseling', 'Anxiety'],
      description: 'Dedicated to supporting adolescents and young adults with anxiety and academic pressure.',
      rating: 4.7,
      reviews: 100,
      verified: true,
      region: 'Gurugram, Haryana',
      email: 'pooja.singh@example.com',
      phone: '+91 91234 56787',
    },
  ],
  "Himachal Pradesh": [
     {
      id: 'hp1',
      name: 'Tenzin Sharma',
      avatar: 'https://i.pravatar.cc/150?img=29',
      specialties: ['Mindfulness', 'Nature Therapy'],
      description: 'Integrates nature-based therapies to help clients find peace and grounding.',
      rating: 4.9,
      reviews: 85,
      verified: true,
      region: 'Shimla, Himachal Pradesh',
      email: 'tenzin.sharma@example.com',
      phone: '+91 91234 56788',
    },
  ],
  "Jharkhand": [
    {
      id: 'jh1',
      name: 'Amit Kumar',
      avatar: 'https://i.pravatar.cc/150?img=30',
      specialties: ['Depression', 'Grief'],
      description: 'Provides a safe and supportive space for individuals dealing with depression and loss.',
      rating: 4.7,
      reviews: 75,
      verified: true,
      region: 'Ranchi, Jharkhand',
      email: 'amit.kumar@example.com',
      phone: '+91 91234 56789',
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
  "Kerala": [
    {
      id: 'kl1',
      name: 'Dr. Anna Thomas',
      avatar: 'https://i.pravatar.cc/150?img=31',
      specialties: ['Relationship Counseling', 'Anxiety'],
      description: 'Helps couples and individuals foster healthier communication and manage anxiety.',
      rating: 4.9,
      reviews: 150,
      verified: true,
      region: 'Kochi, Kerala',
      email: 'anna.thomas@example.com',
      phone: '+91 91234 56790',
    },
  ],
  "Madhya Pradesh": [
     {
      id: 'mp1',
      name: 'Rajat Verma',
      avatar: 'https://i.pravatar.cc/150?img=32',
      specialties: ['Stress Management', 'CBT'],
      description: 'Specializes in cognitive-behavioral therapy to help clients manage stress and negative thoughts.',
      rating: 4.8,
      reviews: 115,
      verified: true,
      region: 'Bhopal, Madhya Pradesh',
      email: 'rajat.verma@example.com',
      phone: '+91 91234 56791',
    },
  ],
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
  "Manipur": [
    {
      id: 'mn1',
      name: 'L. Meitei',
      avatar: 'https://i.pravatar.cc/150?img=33',
      specialties: ['Cultural Identity', 'Trauma'],
      description: 'Focuses on healing and identity within a cultural context.',
      rating: 4.7,
      reviews: 55,
      verified: true,
      region: 'Imphal, Manipur',
      email: 'l.meitei@example.com',
      phone: '+91 91234 56792',
    },
  ],
  "Meghalaya": [
    {
      id: 'ml1',
      name: 'Grace Lyngdoh',
      avatar: 'https://i.pravatar.cc/150?img=34',
      specialties: ['Mindfulness', 'Depression'],
      description: 'A compassionate guide helping clients find light during dark times.',
      rating: 4.8,
      reviews: 70,
      verified: false,
      region: 'Shillong, Meghalaya',
      email: 'grace.lyngdoh@example.com',
      phone: '+91 91234 56793',
    },
  ],
  "Mizoram": [
    {
      id: 'mz1',
      name: 'Lalrinfela',
      avatar: 'https://i.pravatar.cc/150?img=35',
      specialties: ['Youth Counseling', 'Addiction'],
      description: 'Supports young people in overcoming addiction and finding a new path.',
      rating: 4.7,
      reviews: 50,
      verified: true,
      region: 'Aizawl, Mizoram',
      email: 'lalrinfela@example.com',
      phone: '+91 91234 56794',
    },
  ],
  "Nagaland": [
    {
      id: 'nl1',
      name: 'Dr. Ao',
      avatar: 'https://i.pravatar.cc/150?img=36',
      specialties: ['Family Therapy', 'Community Healing'],
      description: 'Works with families and communities to foster understanding and healing.',
      rating: 4.9,
      reviews: 65,
      verified: true,
      region: 'Kohima, Nagaland',
      email: 'dr.ao@example.com',
      phone: '+91 91234 56795',
    },
  ],
  "Odisha": [
    {
      id: 'od1',
      name: 'Dr. Ipsita Mohanty',
      avatar: 'https://i.pravatar.cc/150?img=37',
      specialties: ['Anxiety', 'Women\'s Health'],
      description: 'Empowering women to take control of their mental and emotional health.',
      rating: 4.8,
      reviews: 105,
      verified: true,
      region: 'Bhubaneswar, Odisha',
      email: 'ipsita.mohanty@example.com',
      phone: '+91 91234 56796',
    },
  ],
  "Punjab": [
     {
      id: 'pb1',
      name: 'Harpreet Singh',
      avatar: 'https://i.pravatar.cc/150?img=38',
      specialties: ['Stress Management', 'Depression'],
      description: 'A compassionate counselor helping clients build resilience against stress and depression.',
      rating: 4.8,
      reviews: 120,
      verified: true,
      region: 'Amritsar, Punjab',
      email: 'harpreet.singh@example.com',
      phone: '+91 91234 56797',
    },
  ],
  "Rajasthan": [
    {
      id: 'rj1',
      name: 'Dr. Meera Rajput',
      avatar: 'https://i.pravatar.cc/150?img=39',
      specialties: ['Trauma', 'Relationship Counseling'],
      description: 'Helps clients heal from trauma and build stronger, healthier relationships.',
      rating: 4.9,
      reviews: 135,
      verified: true,
      region: 'Jaipur, Rajasthan',
      email: 'meera.rajput@example.com',
      phone: '+91 91234 56798',
    },
  ],
  "Sikkim": [
    {
      id: 'sk1',
      name: 'Pema Bhutia',
      avatar: 'https://i.pravatar.cc/150?img=40',
      specialties: ['Mindfulness', 'Eco-Therapy'],
      description: 'Integrates mindfulness with nature to promote holistic well-being.',
      rating: 4.9,
      reviews: 75,
      verified: true,
      region: 'Gangtok, Sikkim',
      email: 'pema.bhutia@example.com',
      phone: '+91 91234 56799',
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
  "Tripura": [
    {
      id: 'tr1',
      name: 'Bipasha Deb',
      avatar: 'https://i.pravatar.cc/150?img=41',
      specialties: ['Anxiety', 'Family Counseling'],
      description: 'Helps families communicate better and resolve conflicts.',
      rating: 4.7,
      reviews: 65,
      verified: false,
      region: 'Agartala, Tripura',
      email: 'bipasha.deb@example.com',
      phone: '+91 91234 56800',
    },
  ],
  "Uttar Pradesh": [
     {
      id: 'up1',
      name: 'Dr. Alok Pandey',
      avatar: 'https://i.pravatar.cc/150?img=42',
      specialties: ['Depression', 'Anxiety', 'CBT'],
      description: 'Experienced therapist providing CBT for depression and anxiety in adults.',
      rating: 4.8,
      reviews: 155,
      verified: true,
      region: 'Lucknow, Uttar Pradesh',
      email: 'alok.pandey@example.com',
      phone: '+91 91234 56801',
    },
  ],
  "Uttarakhand": [
    {
      id: 'ut1',
      name: 'Neha Negi',
      avatar: 'https://i.pravatar.cc/150?img=43',
      specialties: ['Mindfulness', 'Stress Management'],
      description: 'Guides clients in mindfulness practices to manage stress and find inner peace.',
      rating: 4.9,
      reviews: 95,
      verified: true,
      region: 'Dehradun, Uttarakhand',
      email: 'neha.negi@example.com',
      phone: '+91 91234 56802',
    },
  ],
  "West Bengal": [
     {
      id: 'wb1',
      name: 'Dr. Sharmila Bose',
      avatar: 'https://i.pravatar.cc/150?img=44',
      specialties: ['Relationship Counseling', 'Anxiety'],
      description: 'Helps couples and individuals build stronger, more fulfilling relationships.',
      rating: 4.9,
      reviews: 160,
      verified: true,
      region: 'Kolkata, West Bengal',
      email: 'sharmila.bose@example.com',
      phone: '+91 91234 56803',
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
};

const allCounselors = Object.values(counselorsByRegion).flat();

type Counselor = (typeof allCounselors)[0];

const CounselorDetailModal = ({
  counselor,
  isOpen,
  onClose,
  onBook,
}: {
  counselor: Counselor | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}) => {
  if (!counselor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full bg-black/20 backdrop-blur-lg border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10">
        <DialogHeader>
          <RadixDialogTitle className="sr-only">{counselor.name}</RadixDialogTitle>
          <motion.div
            key={counselor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <CardHeader className="text-center items-center p-8">
              <Avatar className="h-32 w-32 mb-4 border-4 border-blue-500/30">
                <AvatarImage src={counselor.avatar} alt={counselor.name} />
                <AvatarFallback className="text-4xl">{counselor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-3">
                <CardTitle className="text-3xl font-bold text-white">{counselor.name}</CardTitle>
                {counselor.verified && (
                  <div className="flex items-center gap-1.5 text-green-400">
                    <Check className="h-6 w-6" />
                    <span className="font-semibold">Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <span>{counselor.region}</span>
              </div>
              <div className="flex items-center gap-2 text-lg text-yellow-400 mt-1">
                <Star className="h-5 w-5 fill-current" />
                <span>{counselor.rating} ({counselor.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 space-y-6">
              <p className="text-center text-gray-300 text-base">{counselor.description}</p>
              <div>
                <h4 className="font-semibold text-white mb-3 text-lg">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {counselor.specialties.map(spec => (
                    <span key={spec} className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{spec}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3 text-lg">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 flex items-center gap-2"><Languages className="h-4 w-4" /> English</span>
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50 flex items-center gap-2"><Languages className="h-4 w-4" /> Hindi</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3 text-lg">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={`mailto:${'${'}counselor.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/60 transition-colors border border-gray-600/50">
                    <Mail className="h-5 w-5 text-blue-300" />
                    <span className="text-gray-300">{counselor.email}</span>
                  </a>
                  <a href={`tel:${'${'}counselor.phone}`} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/60 transition-colors border border-gray-600/50">
                    <PhoneCall className="h-5 w-5 text-blue-300" />
                    <span className="text-gray-300">{counselor.phone}</span>
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-8 flex flex-col gap-3">
              <Button size="lg" className="w-full text-lg py-7 bg-blue-600 hover:bg-blue-500" onClick={onBook}>
                Book a Session
              </Button>
              <p className="text-xs text-gray-500 text-center">You will be taken to a secure portal to schedule and pay for your session.</p>
            </CardFooter>
          </motion.div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};


export default function FindCounselorPage() {
  const router = useRouter();
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  const handleBooking = () => {
    setSelectedCounselor(null); // Close detail modal
    setIsBookingConfirmed(true);
  };
  
  const closeConfirmation = () => {
    setIsBookingConfirmed(false);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold text-white">Find a Counselor</h2>
          </div>
          
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(counselorsByRegion).map(([region, counselors]) => (
              <div key={region}>
                <h3 className="text-2xl font-semibold text-blue-300 mb-6 px-2">{region}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {counselors.map((counselor) => (
                    <motion.div key={counselor.id} variants={itemVariants}>
                      <Card
                        onClick={() => setSelectedCounselor(counselor)}
                        className='cursor-pointer transition-all duration-300 bg-gray-900/50 border border-blue-500/20 hover:border-blue-500/70 hover:bg-gray-800/60 rounded-xl overflow-hidden group h-full flex flex-col'
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <Avatar className="h-20 w-20 border-2 border-blue-500/30 flex-shrink-0">
                            <AvatarImage src={counselor.avatar} alt={counselor.name} />
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow overflow-hidden">
                            <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-300 transition-colors">{counselor.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-yellow-400 mt-1">
                              <Star className="h-4 w-4 fill-current" />
                              <span>{counselor.rating} ({counselor.reviews} reviews)</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 mt-auto">
                            <div className="flex flex-wrap gap-1 w-full">
                            {counselor.specialties.slice(0, 2).map(spec => (
                                <span key={spec} className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">{spec}</span>
                            ))}
                            </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-6 text-sm">
                  More counselors from {region} will be added soon.
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <CounselorDetailModal
        counselor={selectedCounselor}
        isOpen={!!selectedCounselor}
        onClose={() => setSelectedCounselor(null)}
        onBook={handleBooking}
      />

      <BookingConfirmation isOpen={isBookingConfirmed} onClose={closeConfirmation} />
    </>
  );
}
