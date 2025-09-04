
import type { TranslateWelcomeMessageOutput } from '@/contexts/ChatContext';

// Add a languageName property for more reliable matching
interface Translation extends TranslateWelcomeMessageOutput {
    languageName: string;
}

export const translations: Record<string, Translation> = {
  'en-US': {
    languageName: 'English',
    welcomeMessage: "Hello! I'm Aura, your empathetic AI companion. I'm here to listen without judgment. To start, what's on your mind today? ☀️",
    suggestedQuestions: [
        { label: "I'm feeling happy! 😊", value: "I'm feeling happy today!" },
        { label: "I'm feeling sad 😔", value: "I'm feeling a bit sad" },
        { label: "I'm feeling anxious 😟", value: "I'm feeling anxious" },
        { label: "I'm having a tough day ⛈️", value: "I'm having a tough day" },
        { label: "I'm celebrating a small win! 🎉", value: "I'm celebrating a small win today!" },
        { label: "I'm feeling overwhelmed 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "I feel a bit lonely 🫂", value: "I'm feeling a bit lonely." },
        { label: "I'm stressed about work/school 😫", value: "I'm feeling stressed about work/school." },
        { label: "I just need to vent 😤", value: "I just need to vent for a minute." },
    ]
  },
  'hi-IN': {
    languageName: 'Hindi',
    welcomeMessage: "नमस्ते! मैं ऑरा हूं, आपकी सहानुभूतिपूर्ण एआई साथी। मैं यहां बिना किसी निर्णय के सुनने के लिए हूं। शुरू करने के लिए, आज आपके मन में क्या है? ☀️",
    suggestedQuestions: [
        { label: "मैं खुश महसूस कर रहा हूँ! 😊", value: "I'm feeling happy today!" },
        { label: "मैं दुखी महसूस कर रहा हूँ 😔", value: "I'm feeling a bit sad" },
        { label: "मुझे चिंता हो रही है 😟", value: "I'm feeling anxious" },
        { label: "मेरा दिन मुश्किल भरा है ⛈️", value: "I'm having a tough day" },
        { label: "मैं एक छोटी सी जीत का जश्न मना रहा हूँ! 🎉", value: "I'm celebrating a small win today!" },
        { label: "मैं अभिभूत महसूस कर रहा हूँ 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "मुझे थोड़ा अकेलापन महसूस हो रहा है 🫂", value: "I'm feeling a bit lonely." },
        { label: "मैं काम/स्कूल को लेकर तनाव में हूँ 😫", value: "I'm feeling stressed about work/school." },
        { label: "मुझे बस अपनी भड़ास निकालनी है 😤", value: "I just need to vent for a minute." },
    ]
  },
  // Add other languages here as needed
};
