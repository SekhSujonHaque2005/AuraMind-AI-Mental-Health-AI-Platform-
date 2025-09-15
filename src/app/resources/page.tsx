
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink, Clapperboard, PlayCircle, VideoIcon, Languages, Music } from "lucide-react";
import { getVideos } from "./actions";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import VideoPlayerModal from "@/components/video-player-modal";
import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/video-card";
import TextType from "@/components/ui/text-type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import type { YouTubeVideo } from "@/contexts/ChatContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const staticResources = [
  {
    name: "National Suicide Prevention Lifeline",
    description: "Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.",
    phone: "988",
    website: "https://988lifeline.org/",
  },
  {
    name: "Crisis Text Line",
    description: "Connect with a volunteer Crisis Counselor for free, 24/7 support via text message.",
    phone: "Text HOME to 741741",
    website: "https://www.crisistextline.org/",
  },
  {
    name: "The Trevor Project",
    description: "The leading national organization providing crisis intervention and suicide prevention services to LGBTQ young people under 25.",
    phone: "1-866-488-7386",
    website: "https://www.thetrevorproject.org/",
  },
];

const videoQueries = [
  { 
    title: "Guided Meditations", 
    queries: {
      en: "10 minute guided meditation for beginners",
      hi: "10 मिनट का ध्यान शुरुआती लोगों के लिए",
      es: "meditación guiada de 10 minutos para principiantes",
      fr: "méditation guidée de 10 minutes pour débutants",
      ar: "تأمل موجه لمدة 10 دقائق للمبتدئين",
      bn: "নতুনদের জন্য ১০ মিনিটের নির্দেশিত ধ্যান",
      pt: "meditação guiada de 10 minutos para iniciantes",
      ru: "10-минутная управляемая медитация для начинающих",
    }
  },
  { 
    title: "Mental Health Tips", 
    queries: {
        en: "daily mental health tips",
        hi: "दैनिक मानसिक स्वास्थ्य युक्तियाँ",
        es: "consejos diarios de salud mental",
        fr: "conseils quotidiens sur la santé mentale",
        ar: "نصائح يومية للصحة النفسية",
        bn: "দৈনিক মানসিক স্বাস্থ্য টিপস",
        pt: "dicas diárias de saúde mental",
        ru: "ежедневные советы по психическому здоровью",
    }
  },
  { 
    title: "Mindfulness Exercises", 
    queries: {
        en: "mindfulness exercises for anxiety",
        hi: "चिंता के लिए माइंडफुलनेस व्यायाम",
        es: "ejercicios de mindfulness para la ansiedad",
        fr: "exercices de pleine conscience pour l'anxiété",
        ar: "تمارين اليقظة للتعامل مع القلق",
        bn: "উদ্বেগের জন্য মননশীলতা ব্যায়াম",
        pt: "exercícios de mindfulness para ansiedade",
        ru: "упражнения на осознанность при тревоге",
    }
  },
  { 
    title: "Yoga for Relaxation", 
    queries: {
        en: "yoga for relaxation and stress relief",
        hi: "विश्राम और तनाव से राहत के लिए योग",
        es: "yoga para relajación y alivio del estrés",
        fr: "yoga pour la relaxation et le soulagement du stress",
        ar: "يوجا للاسترخاء وتخفيف التوتر",
        bn: "শিথিলকরণ এবং মানসিক চাপ মুক্তির জন্য যোগব্যায়াম",
        pt: "ioga para relaxamento e alívio do estresse",
        ru: "йога для расслабления и снятия стресса",
    }
  },
  { 
    title: "Positive Affirmations", 
    queries: {
        en: "positive affirmations for self-love",
        hi: "आत्म-प्रेम के लिए सकारात्मक पुष्टि",
        es: "afirmaciones positivas para el amor propio",
        fr: "affirmations positives pour l'amour de soi",
        ar: "تأكيدات إيجابية لحب الذات",
        bn: "আত্ম-প্রেমের জন্য ইতিবাচক உறுதி",
        pt: "afirmações positivas para o amor-próprio",
        ru: "позитивные аффирмации для любви к себе",
    }
  },
  { 
    title: "Breathing Exercises", 
    queries: {
        en: "5 minute breathing exercise for stress",
        hi: "तनाव के लिए 5 मिनट का साँस लेने का व्यायाम",
        es: "ejercicio de respiración de 5 minutos para el estrés",
        fr: "exercice de respiration de 5 minutes contre le stress",
        ar: "تمرين تنفس لمدة 5 دقائق للتوتر",
        bn: "চাপের জন্য ৫ মিনিটের শ্বাস-প্রশ্বাসের ব্যায়াম",
        pt: "exercício de respiração de 5 minutos para o estresse",
        ru: "5-минутное дыхательное упражнение от стресса",
    }
  },
];

const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'ar', label: 'Arabic' },
    { value: 'bn', label: 'Bengali' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
];

interface VideoSectionProps {
  title: string;
  videos: YouTubeVideo[];
  onVideoClick: (video: YouTubeVideo) => void;
  hoveredVideoId: string | null;
  setHoveredVideoId: (id: string | null) => void;
}

const VideoSection = ({ title, videos, onVideoClick, hoveredVideoId, setHoveredVideoId }: VideoSectionProps) => {
    if (videos.length === 0) return null;

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                <Clapperboard className="mr-3 h-8 w-8 text-blue-400" /> {title}
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <VideoCard
                        key={video.id.videoId}
                        video={video}
                        isHovered={hoveredVideoId === video.id.videoId}
                        onMouseEnter={() => setHoveredVideoId(video.id.videoId)}
                        onMouseLeave={() => setHoveredVideoId(null)}
                        onClick={() => onVideoClick(video)}
                    />
                ))}
            </div>
        </div>
    );
};


const LoadingSkeleton = () => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3 bg-black/30 backdrop-blur-md border border-blue-500/20 rounded-2xl p-4">
                <Skeleton className="h-[180px] w-full rounded-lg bg-gray-800" />
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-5/6 rounded bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 rounded bg-gray-800" />
                </div>
            </div>
        ))}
    </div>
);

const NoVideosFound = () => (
    <div className="text-center py-10 px-4 rounded-2xl bg-black/30 backdrop-blur-md border border-blue-500/20">
        <VideoIcon className="mx-auto h-12 w-12 text-blue-400" />
        <h3 className="mt-4 text-xl font-semibold text-white">No Videos Found</h3>
        <p className="mt-2 text-gray-400">
            There may be an issue with loading videos for the selected language. Please ensure the YouTube API key is correctly configured or try another language.
        </p>
    </div>
)


export default function ResourcesPage() {
  const [videoData, setVideoData] = useState<{ title: string; videos: YouTubeVideo[] }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [hasVideos, setHasVideos] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const data = await Promise.all(
        videoQueries.map(async ({ title, queries }) => {
          const queryForLang = queries[selectedLanguage as keyof typeof queries] || queries.en;
          const videos = await getVideos(queryForLang, selectedLanguage);
          return { title, videos };
        })
      );
      const filteredData = data.filter(section => section.videos.length > 0);
      setVideoData(filteredData);
      setHasVideos(filteredData.length > 0);
      setIsLoading(false);
    };

    fetchVideos();
  }, [selectedLanguage]);

  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };


  return (
    <>
    <div className="relative flex flex-col items-center min-h-screen p-4 pb-24 overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f633,transparent)]"></div>
      </div>
      
      <div className="w-full max-w-7xl relative">
        <div className="absolute top-6 right-6 z-20">
            <div className="relative w-full max-w-xs flex flex-col items-end gap-2">
                 <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.9, 1],
                        repeat: Infinity,
                        repeatDelay: 5
                    }}
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blue-500/30 blur-xl pointer-events-none"
                />
                <Label className="text-sm text-gray-400 mr-2">Select Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-md border-blue-500/20 text-white focus:ring-blue-500/50">
                        <div className="flex items-center gap-2">
                           <Languages className="h-5 w-5 text-blue-400" />
                           <SelectValue placeholder="Select Language" />
                        </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/80 backdrop-blur-md border-blue-500/30 text-white">
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.value} className="cursor-pointer hover:bg-blue-500/10">
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="text-center my-16 flex flex-col items-center">
            <TextType
              as="h1"
              text="Psychoeducational Resource Hub"
              typingSpeed={60}
              loop={false}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-4"
            />
            <TextType
                text="Explore videos, relaxation audio, and guides to support your mental wellness journey."
                typingSpeed={20}
                initialDelay={1500}
                loop={false}
                className="text-lg max-w-3xl mx-auto text-gray-400"
            />
        </div>

        {isLoading ? (
            <div className="space-y-12">
                {videoQueries.map(({title}) => (
                    <div key={title}>
                        <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                            <Clapperboard className="mr-3 h-8 w-8 text-blue-400" /> {title}
                        </h2>
                        <LoadingSkeleton />
                    </div>
                ))}
            </div>
        ) : hasVideos ? (
            videoData.map(({ title, videos }) => (
                <VideoSection 
                key={title} 
                title={title} 
                videos={videos} 
                onVideoClick={handleVideoClick}
                hoveredVideoId={hoveredVideoId}
                setHoveredVideoId={setHoveredVideoId}
                />
            ))
        ) : (
            <NoVideosFound />
        )}

        <div className="mt-16 mb-16">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 flex items-center">
                <Music className="mr-3 h-8 w-8 text-blue-400" /> Relaxation Audio
            </h2>
            <Card className="flex flex-col md:flex-row items-center bg-black/30 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden group">
                <div className="relative w-full md:w-1/3 h-48 md:h-full">
                    <Image src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670" alt="Playlist" fill className="object-cover" data-ai-hint="music abstract" />
                </div>
                <div className="p-8">
                    <CardTitle className="text-2xl text-blue-300">Curated Playlists</CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        Find the perfect soundtrack for focus, relaxation, or meditation. Our extensive audio library includes ambient music, nature sounds, lofi beats, and guided meditations.
                    </CardDescription>
                    <Link href="/playlist" passHref>
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-500">
                            Explore Audio Library
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>


        <div className="mt-20">
            <h2 className="text-3xl font-bold text-blue-300 mb-6 text-center">Immediate Support Hotlines</h2>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {staticResources.map((resource) => (
                <Card key={resource.name} className="flex flex-col bg-black/30 backdrop-blur-md border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] rounded-2xl overflow-hidden group">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                    <span className="text-xl text-blue-300">{resource.name}</span>
                    {resource.website && (
                        <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label={`Visit ${resource.name} website`}
                        >
                        <ExternalLink className="h-5 w-5" />
                        </a>
                    )}
                    </CardTitle>
                    <CardDescription className="text-gray-400 pt-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4">
                    <p className="font-semibold text-blue-300 text-lg">{resource.phone}</p>
                </CardContent>
                </Card>
            ))}
            </div>
            <p className="text-gray-500 text-center text-sm mt-8">
                If you are in immediate danger, please call 911 or your local emergency number.
            </p>
        </div>
      </div>
    </div>
    {selectedVideo && (
        <VideoPlayerModal 
            video={selectedVideo} 
            onClose={handleCloseModal}
        />
    )}
    </>
  );
}
