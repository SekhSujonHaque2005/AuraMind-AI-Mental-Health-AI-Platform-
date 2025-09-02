
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Phone, DatabaseZap } from 'lucide-react';

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-lg bg-gray-900/50 border border-blue-500/20 shadow-[0_0_25px_rgba(72,149,239,0.15)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-500 mb-2">
            AI Wellness Consultant
          </CardTitle>
          <CardDescription className="text-gray-400">
            Before we begin, please review and accept the following:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/50 border border-transparent hover:border-blue-500/30 transition-all">
              <ShieldCheck className="h-6 w-6 text-blue-400 mt-1" />
              <div className="flex items-center space-x-3">
                <Checkbox id="consent1" checked={consent1} onCheckedChange={(checked) => setConsent1(Boolean(checked))} />
                <Label htmlFor="consent1" className="text-base text-gray-300">
                  This is not medical advice. This is an AI wellness companion designed for supportive conversations.
                </Label>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/50 border border-transparent hover:border-blue-500/30 transition-all">
              <Phone className="h-6 w-6 text-blue-400 mt-1" />
              <div className="flex items-center space-x-3">
                <Checkbox id="consent2" checked={consent2} onCheckedChange={(checked) => setConsent2(Boolean(checked))} />
                <Label htmlFor="consent2" className="text-base text-gray-300">
                  If you are in a crisis, please call emergency services or a helpline immediately.
                </Label>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-800/50 border border-transparent hover:border-blue-500/30 transition-all">
              <DatabaseZap className="h-6 w-6 text-blue-400 mt-1" />
              <div className="flex items-center space-x-3">
                <Checkbox id="consent3" checked={consent3} onCheckedChange={(checked) => setConsent3(Boolean(checked))} />
                <Label htmlFor="consent3" className="text-base text-gray-300">
                  I understand that my data will be handled as per the privacy policy and I have control over it.
                </Label>
              </div>
            </div>
          </div>
          <Button
            disabled={!allConsentsGiven}
            className="w-full mt-8 text-lg py-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-all"
            onClick={handleContinue}
          >
            Accept and Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
