
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

export default function FeedbackPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const formData = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
      rating: rating,
      feedback: feedback,
      subject: "New Feedback from AuraMind Consultant",
    };

    try {
      const res = await axios.post("https://api.web3forms.com/submit", formData);

      if (res.data.success) {
        toast({
          title: 'Feedback Submitted',
          description: "Thank you for helping us improve!",
        });
        router.push('/consultant/persona');
      } else {
        console.error("Web3Forms submission error:", res.data.message);
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: res.data.message || 'There was an error sending your feedback.',
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
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg bg-gray-900/50 border border-blue-500/20 shadow-[0_0_25px_rgba(72,149,239,0.15)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-2">
            Share Your Feedback
          </CardTitle>
          <CardDescription className="text-gray-400">
            Your experience matters. Help us improve the AI Wellness Consultant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Star Rating */}
            <div className="flex flex-col items-center space-y-3">
                <Label className="text-lg text-gray-300">How was your session?</Label>
                <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    className={cn(
                        'h-8 w-8 cursor-pointer transition-colors duration-200',
                        (hoverRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    )}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    />
                ))}
                </div>
            </div>

            {/* Feedback Text Area */}
            <div className="space-y-2">
                <Label htmlFor="feedback-text" className="text-lg text-gray-300">Additional Comments</Label>
                <Textarea
                    id="feedback-text"
                    placeholder="Tell us more about your experience..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] bg-gray-800/60 border-blue-500/30 text-gray-200 focus:ring-blue-500"
                    disabled={isSubmitting}
                />
            </div>
          </div>

          <Button
            className="w-full mt-8 text-lg py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 transition-all"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Add a simple label component for use in this page
function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
    return <label className={cn("font-medium text-gray-300", className)} {...props} />;
}
