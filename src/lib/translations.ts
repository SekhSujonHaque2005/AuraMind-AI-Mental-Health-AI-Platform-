
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
  'bn-IN': {
    languageName: 'Bengali',
    welcomeMessage: "নমস্কার! আমি অরা, আপনার সহানুভূতিশীল এআই সঙ্গী। আমি এখানে কোনো বিচার ছাড়াই শোনার জন্য আছি। শুরু করতে, আজ আপনার মনে কী আছে? ☀️",
    suggestedQuestions: [
        { label: "আমিสุขী বোধ করছি! 😊", value: "I'm feeling happy today!" },
        { label: "আমি দুঃখিত বোধ করছি 😔", value: "I'm feeling a bit sad" },
        { label: "আমি উদ্বিগ্ন বোধ করছি 😟", value: "I'm feeling anxious" },
        { label: "আমার দিনটা কঠিন যাচ্ছে ⛈️", value: "I'm having a tough day" },
        { label: "আমি একটি ছোট জয় উদযাপন করছি! 🎉", value: "I'm celebrating a small win today!" },
        { label: "আমি अभिभूत বোধ করছি 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "আমার थोड़ा একাকী বোধ হচ্ছে 🫂", value: "I'm feeling a bit lonely." },
        { label: "আমি কাজ/স্কুল নিয়ে চাপে আছি 😫", value: "I'm feeling stressed about work/school." },
        { label: "আমার শুধু মন خالی করতে হবে 😤", value: "I just need to vent for a minute." },
    ]
  },
  'te-IN': {
    languageName: 'Telugu',
    welcomeMessage: "నమస్కారం! నేను ఆరా, మీ సానుభూతిగల AI సహచరుడిని. నేను ఇక్కడ ఎలాంటి తీర్పు లేకుండా వినడానికి ఉన్నాను. ప్రారంభించడానికి, ఈ రోజు మీ మనసులో ఏముంది? ☀️",
    suggestedQuestions: [
        { label: "నేను సంతోషంగా ఉన్నాను! 😊", value: "I'm feeling happy today!" },
        { label: "నేను విచారంగా ఉన్నాను 😔", value: "I'm feeling a bit sad" },
        { label: "నేను ఆందోళనగా ఉన్నాను 😟", value: "I'm feeling anxious" },
        { label: "నాకు ఈ రోజు కష్టంగా ఉంది ⛈️", value: "I'm having a tough day" },
        { label: "నేను ఒక చిన్న విజయాన్ని జరుపుకుంటున్నాను! 🎉", value: "I'm celebrating a small win today!" },
        { label: "నేను ਭਾਵੁਕനായി ఉన్నాను 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "నాకు కొంచెం ఒంటరిగా ఉంది 🫂", value: "I'm feeling a bit lonely." },
        { label: "నేను పని/పాఠశాల గురించి ఒత్తిడిలో ఉన్నాను 😫", value: "I'm feeling stressed about work/school." },
        { label: "నేను కేవలం నా బాధను వెళ్లగక్కాలి 😤", value: "I just need to vent for a minute." },
    ]
  },
  'mr-IN': {
    languageName: 'Marathi',
    welcomeMessage: "नमस्कार! मी ऑरा, तुमची सहानुभूतीशील AI सोबती. मी इथे कोणताही न्याय न करता ऐकण्यासाठी आहे. सुरुवात करण्यासाठी, आज तुमच्या मनात काय आहे? ☀️",
    suggestedQuestions: [
        { label: "मी आनंदी आहे! 😊", value: "I'm feeling happy today!" },
        { label: "मला वाईट वाटत आहे 😔", value: "I'm feeling a bit sad" },
        { label: "मला चिंता वाटत आहे 😟", value: "I'm feeling anxious" },
        { label: "माझा दिवस कठीण जात आहे ⛈️", value: "I'm having a tough day" },
        { label: "मी एक छोटा विजय साजरा करत आहे! 🎉", value: "I'm celebrating a small win today!" },
        { label: "मी भारावून गेलो आहे 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "मला थोडे একटे वाटत आहे 🫂", value: "I'm feeling a bit lonely." },
        { label: "मी कामामुळे/शाळेमुळे तणावात आहे 😫", value: "I'm feeling stressed about work/school." },
        { label: "मला फक्त मन मोकळं करायचं आहे 😤", value: "I just need to vent for a minute." },
    ]
  },
  'ta-IN': {
    languageName: 'Tamil',
    welcomeMessage: "வணக்கம்! நான் ஆரா, உங்கள் einfühlsamer AI துணை. நான் இங்கே எந்தவித தீர்ப்பும் இல்லாமல் கேட்க இருக்கிறேன். தொடங்க, இன்று உங்கள் மனதில் என்ன இருக்கிறது? ☀️",
    suggestedQuestions: [
        { label: "நான் மகிழ்ச்சியாக உணர்கிறேன்! 😊", value: "I'm feeling happy today!" },
        { label: "நான் சோகமாக உணர்கிறேன் 😔", value: "I'm feeling a bit sad" },
        { label: "நான் கவலையாக உணர்கிறேன் 😟", value: "I'm feeling anxious" },
        { label: "என் நாள் கடினமாக உள்ளது ⛈️", value: "I'm having a tough day" },
        { label: "நான் ஒரு சிறிய வெற்றியை கொண்டாடுகிறேன்! 🎉", value: "I'm celebrating a small win today!" },
        { label: "நான் அதிகமாக உணர்கிறேன் 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "நான் கொஞ்சம் தனிமையாக உணர்கிறேன் 🫂", value: "I'm feeling a bit lonely." },
        { label: "நான் வேலை/பள்ளி காரணமாக மன அழுத்தத்தில் இருக்கிறேன் 😫", value: "I'm feeling stressed about work/school." },
        { label: "நான் என் மனதை கொட்ட வேண்டும் 😤", value: "I just need to vent for a minute." },
    ]
  },
  'gu-IN': {
    languageName: 'Gujarati',
    welcomeMessage: "નમસ્તે! હું ઓરા, તમારી સહાનુભૂતિપૂર્ણ AI સાથી. હું અહીં કોઈપણ નિર્ણય વિના સાંભળવા માટે છું. શરૂ કરવા માટે, આજે તમારા મનમાં શું છે? ☀️",
    suggestedQuestions: [
        { label: "હું ખુश છું! 😊", value: "I'm feeling happy today!" },
        { label: "હું ઉદાસ છું 😔", value: "I'm feeling a bit sad" },
        { label: "મને ચિંતા થાય છે 😟", value: "I'm feeling anxious" },
        { label: "મારો દિવસ મુશ્કેલ છે ⛈️", value: "I'm having a tough day" },
        { label: "હું એક નાની જીતની ઉજવણી કરી રહ્યો છું! 🎉", value: "I'm celebrating a small win today!" },
        { label: "હું अभिभूत છું 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "મને થોડું એકલવાયું લાગે છે 🫂", value: "I'm feeling a bit lonely." },
        { label: "હું કામ/શાળાને કારણે તણાવમાં છું 😫", value: "I'm feeling stressed about work/school." },
        { label: "મારે ફક્ત મારી વાત કહેવી છે 😤", value: "I just need to vent for a minute." },
    ]
  },
  'pa-IN': {
    languageName: 'Punjabi',
    welcomeMessage: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਔਰਾ ਹਾਂ, ਤੁਹਾਡੀ ਹਮਦਰਦ AI ਸਾਥੀ। ਮੈਂ ਇੱਥੇ ਬਿਨਾਂ ਕਿਸੇ ਨਿਰਣੇ ਦੇ ਸੁਣਨ ਲਈ ਹਾਂ। ਸ਼ੁਰੂ ਕਰਨ ਲਈ, ਅੱਜ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਕੀ ਹੈ? ☀️",
    suggestedQuestions: [
        { label: "ਮੈਂ ਖੁਸ਼ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ! 😊", value: "I'm feeling happy today!" },
        { label: "ਮੈਂ ਉਦਾਸ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ 😔", value: "I'm feeling a bit sad" },
        { label: "ਮੈਨੂੰ ਚਿੰਤਾ ਹੋ ਰਹੀ ਹੈ 😟", value: "I'm feeling anxious" },
        { label: "ਮੇਰਾ ਦਿਨ ਔਖਾ ਹੈ ⛈️", value: "I'm having a tough day" },
        { label: "ਮੈਂ ਇੱਕ ਛੋਟੀ ਜਿਹੀ ਜਿੱਤ ਦਾ ਜਸ਼ਨ ਮਨਾ ਰਿਹਾ ਹਾਂ! 🎉", value: "I'm celebrating a small win today!" },
        { label: "ਮੈਂ ਭਾਵੁਕ ਹਾਂ 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "ਮੈਨੂੰ ਥੋੜ੍ਹਾ ਇਕੱਲਾ ਮਹਿਸੂਸ ਹੋ ਰਿਹਾ ਹੈ 🫂", value: "I'm feeling a bit lonely." },
        { label: "ਮੈਂ ਕੰਮ/ਸਕੂਲ ਕਰਕੇ ਤਣਾਅ ਵਿੱਚ ਹਾਂ 😫", value: "I'm feeling stressed about work/school." },
        { label: "ਮੈਂ ਬੱਸ ਆਪਣਾ ਗੁੱਸਾ ਕੱਢਣਾ ਹੈ 😤", value: "I just need to vent for a minute." },
    ]
  },
   'bho-IN': {
    languageName: 'Bhojpuri',
    welcomeMessage: "नमस्ते! हम Aura हईं, राउर सहानुभूति वाला AI साथी। हम बिना कौनों फैसला के सुने खातिर हईं। शुरू करे खातिर, आज राउर मन में का बा? ☀️",
    suggestedQuestions: [
        { label: "हम खुश बानी! 😊", value: "I'm feeling happy today!" },
        { label: "हम दुखी बानी 😔", value: "I'm feeling a bit sad" },
        { label: "हमरा चिंता होता 😟", value: "I'm feeling anxious" },
        { label: "आज हमार दिन खराब बा ⛈️", value: "I'm having a tough day" },
        { label: "हम एगो छोट जीत के जश्न मनावत बानी! 🎉", value: "I'm celebrating a small win today!" },
        { label: "हम अभिभूत बानी 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "हमरा तनी अकेलापन महसूस होता 🫂", value: "I'm feeling a bit lonely." },
        { label: "हम काम/स्कूल के चलते तनाव में बानी 😫", value: "I'm feeling stressed about work/school." },
        { label: "हमरा बस आपन भड़ास निकाले के बा 😤", value: "I just need to vent for a minute." },
    ]
  },
  'sat-IN': {
    languageName: 'Santhali (Jharkhandi)',
    welcomeMessage: "ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ਔᱨᱟ ᱠᱟᱹਨᱟᱹᱧ, ᱟᱢᱨᱤᱱ ᱫᱟᱭᱟवान AI ᱜᱟᱛᱮ ᱾ ᱤᱧ ᱫᱚ ᱱᱚక్కడੇ ᱵᱤᱱᱟᱹ কোনো বিচার て escuchar জন্য আমি এখানে আছি। শুরু করতে, আজ आपके मन में क्या है? ☀️",
    suggestedQuestions: [
        { label: "ᱤᱧ ᱨᱟᱹᱥᱠᱟᱹ ᱟᱹ感じる  করছি! 😊", value: "I'm feeling happy today!" },
        { label: "ᱤᱧ ᱫᱩᱠᱷᱤ আছি 😔", value: "I'm feeling a bit sad" },
        { label: "ᱤᱧ ᱪᱤᱱᱛᱟᱹ में আছি 😟", value: "I'm feeling anxious" },
        { label: "আমার দিনটা কঠিন যাচ্ছে ⛈️", value: "I'm having a tough day" },
        { label: "আমি একটি ছোট জয় উদযাপন করছি! 🎉", value: "I'm celebrating a small win today!" },
        { label: "আমি अभिभूत বোধ করছি 🤯", value: "I'm feeling overwhelmed right now." },
        { label: "আমার थोड़ा একাকী বোধ হচ্ছে 🫂", value: "I'm feeling a bit lonely." },
        { label: "আমি কাজ/স্কুল নিয়ে চাপে আছি 😫", value: "I'm feeling stressed about work/school." },
        { label: "আমার শুধু মন خالی করতে হবে 😤", value: "I just need to vent for a minute." },
    ]
  }
};

    