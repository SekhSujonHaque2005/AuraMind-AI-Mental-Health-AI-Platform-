
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
        { label: "मैं खुश महसूस कर रहा हूँ! 😊", value: "मैं आज खुश महसूस कर रहा हूँ!" },
        { label: "मैं दुखी महसूस कर रहा हूँ 😔", value: "मैं थोड़ा दुखी महसूस कर रहा हूँ" },
        { label: "मुझे चिंता हो रही है 😟", value: "मुझे चिंता हो रही है" },
        { label: "मेरा दिन मुश्किल भरा है ⛈️", value: "मेरा दिन मुश्किल भरा है" },
        { label: "मैं एक छोटी सी जीत का जश्न मना रहा हूँ! 🎉", value: "मैं आज एक छोटी सी जीत का जश्न मना रहा हूँ!" },
        { label: "मैं अभिभूत महसूस कर रहा हूँ 🤯", value: "मैं अभी अभिभूत महसूस कर रहा हूँ।" },
        { label: "मुझे थोड़ा अकेलापन महसूस हो रहा है 🫂", value: "मुझे थोड़ा अकेलापन महसूस हो रहा है।" },
        { label: "मैं काम/स्कूल को लेकर तनाव में हूँ 😫", value: "मैं काम/स्कूल को लेकर तनाव में हूँ।" },
        { label: "मुझे बस अपनी भड़ास निकालनी है 😤", value: "मुझे बस एक मिनट के लिए अपनी भड़ास निकालनी है।" },
    ]
  },
  'es': {
    languageName: 'Spanish',
    welcomeMessage: "¡Hola! Soy Aura, tu compañera de IA empática. Estoy aquí para escucharte sin juzgar. Para empezar, ¿qué tienes en mente hoy? ☀️",
    suggestedQuestions: [
        { label: "¡Me siento feliz! 😊", value: "¡Hoy me siento feliz!" },
        { label: "Me siento triste 😔", value: "Me siento un poco triste" },
        { label: "Me siento ansioso 😟", value: "Me siento ansioso" },
        { label: "Estoy teniendo un día difícil ⛈️", value: "Estoy teniendo un día difícil" },
        { label: "¡Estoy celebrando una pequeña victoria! 🎉", value: "¡Hoy estoy celebrando una pequeña victoria!" },
        { label: "Me siento abrumado 🤯", value: "Me siento abrumado en este momento." },
        { label: "Me siento un poco solo 🫂", value: "Me siento un poco solo." },
        { label: "Estoy estresado por el trabajo/la escuela 😫", value: "Estoy estresado por el trabajo/la escuela." },
        { label: "Solo necesito desahogarme 😤", value: "Solo necesito desahogarme un minuto." },
    ]
  },
  'fr': {
    languageName: 'French',
    welcomeMessage: "Bonjour ! Je suis Aura, votre compagnon IA empathique. Je suis là pour écouter sans jugement. Pour commencer, qu'avez-vous en tête aujourd'hui ? ☀️",
    suggestedQuestions: [
        { label: "Je me sens heureux ! 😊", value: "Je me sens heureux aujourd'hui !" },
        { label: "Je me sens triste 😔", value: "Je me sens un peu triste" },
        { label: "Je me sens anxieux 😟", value: "Je me sens anxieux" },
        { label: "Je passe une journée difficile ⛈️", value: "Je passe une journée difficile" },
        { label: "Je célèbre une petite victoire ! 🎉", value: "Je célèbre une petite victoire aujourd'hui !" },
        { label: "Je me sens dépassé 🤯", value: "Je me sens dépassé en ce moment." },
        { label: "Je me sens un peu seul 🫂", value: "Je me sens un peu seul." },
        { label: "Je suis stressé par le travail/l'école 😫", value: "Je suis stressé par le travail/l'école." },
        { label: "J'ai juste besoin de me défouler 😤", value: "J'ai juste besoin de me défouler une minute." },
    ]
  },
  'de': {
    languageName: 'German',
    welcomeMessage: "Hallo! Ich bin Aura, dein empathischer KI-Begleiter. Ich bin hier, um ohne zu urteilen zuzuhören. Was beschäftigt dich heute? ☀️",
    suggestedQuestions: [
        { label: "Ich fühle mich glücklich! 😊", value: "Ich fühle mich heute glücklich!" },
        { label: "Ich fühle mich traurig 😔", value: "Ich fühle mich ein wenig traurig" },
        { label: "Ich fühle mich ängstlich 😟", value: "Ich fühle mich ängstlich" },
        { label: "Ich habe einen schweren Tag ⛈️", value: "Ich habe einen schweren Tag" },
        { label: "Ich feiere einen kleinen Sieg! 🎉", value: "Ich feiere heute einen kleinen Sieg!" },
        { label: "Ich fühle mich überfordert 🤯", value: "Ich fühle mich im Moment überfordert." },
        { label: "Ich fühle mich ein wenig einsam 🫂", value: "Ich fühle mich ein wenig einsam." },
        { label: "Ich bin gestresst von der Arbeit/Schule 😫", value: "Ich bin gestresst von der Arbeit/Schule." },
        { label: "Ich muss einfach mal Dampf ablassen 😤", value: "Ich muss einfach mal eine Minute Dampf ablassen." },
    ]
  },
  'it': {
    languageName: 'Italian',
    welcomeMessage: "Ciao! Sono Aura, la tua compagna AI empatica. Sono qui per ascoltare senza giudicare. Per iniziare, cosa ti passa per la testa oggi? ☀️",
    suggestedQuestions: [
        { label: "Mi sento felice! 😊", value: "Oggi mi sento felice!" },
        { label: "Mi sento triste 😔", value: "Mi sento un po' triste" },
        { label: "Mi sento ansioso 😟", value: "Mi sento ansioso" },
        { label: "Sto passando una giornata difficile ⛈️", value: "Sto passando una giornata difficile" },
        { label: "Sto festeggiando una piccola vittoria! 🎉", value: "Oggi sto festeggiando una piccola vittoria!" },
        { label: "Mi sento sopraffatto 🤯", value: "In questo momento mi sento sopraffatto." },
        { label: "Mi sento un po' solo 🫂", value: "Mi sento un po' solo." },
        { label: "Sono stressato per il lavoro/la scuola 😫", value: "Sono stressato per il lavoro/la scuola." },
        { label: "Ho solo bisogno di sfogarmi 😤", value: "Ho solo bisogno di sfogarmi per un minuto." },
    ]
  },
  'ja': {
    languageName: 'Japanese',
    welcomeMessage: "こんにちは！私はあなたの共感的なAIコンパニオン、Auraです。批判することなく話を聞くためにここにいます。まず、今日はどんなことを考えていますか？☀️",
    suggestedQuestions: [
        { label: "幸せな気分です！😊", value: "今日は幸せな気分です！" },
        { label: "少し悲しいです 😔", value: "少し悲しいです" },
        { label: "不安です 😟", value: "不安です" },
        { label: "大変な一日です ⛈️", value: "大変な一日です" },
        { label: "小さな勝利を祝っています！🎉", value: "今日は小さな勝利を祝っています！" },
        { label: "圧倒されています 🤯", value: "今、圧倒されています。" },
        { label: "少し寂しいです 🫂", value: "少し寂しいです。" },
        { label: "仕事/学校のことでストレスを感じています 😫", value: "仕事/学校のことでストレスを感じています。" },
        { label: "ちょっと愚痴を言いたいです 😤", value: "ちょっと愚痴を言いたいです。" },
    ]
  },
  'ar': {
    languageName: 'Arabic',
    welcomeMessage: "مرحباً! أنا أورا، رفيقك الذكاء الاصطناعي المتعاطف. أنا هنا للاستماع دون إصدار أحكام. للبدء، ما الذي يدور في ذهنك اليوم؟ ☀️",
    suggestedQuestions: [
        { label: "أشعر بالسعادة! 😊", value: "أشعر بالسعادة اليوم!" },
        { label: "أشعر بالحزن 😔", value: "أشعر ببعض الحزن" },
        { label: "أشعر بالقلق 😟", value: "أشعر بالقلق" },
        { label: "أمر بيوم صعب ⛈️", value: "أمر بيوم صعب" },
        { label: "أحتفل بفوز صغير! 🎉", value: "أحتفل اليوم بفوز صغير!" },
        { label: "أشعر بالإرهاق 🤯", value: "أشعر بالإرهاق الآن." },
        { label: "أشعر بالوحدة قليلاً 🫂", value: "أشعر بالوحدة قليلاً." },
        { label: "أنا متوتر بسبب العمل/المدرسة 😫", value: "أنا متوتر بسبب العمل/المدرسة." },
        { label: "أحتاج فقط إلى التنفيس 😤", value: "أحتاج فقط إلى التنفيس لمدة دقيقة." },
    ]
  },
  'pt': {
    languageName: 'Portuguese',
    welcomeMessage: "Olá! Eu sou a Aura, sua companheira de IA empática. Estou aqui para ouvir sem julgar. Para começar, o que está em sua mente hoje? ☀️",
    suggestedQuestions: [
        { label: "Estou me sentindo feliz! 😊", value: "Hoje estou me sentindo feliz!" },
        { label: "Estou me sentindo triste 😔", value: "Estou me sentindo um pouco triste" },
        { label: "Estou me sentindo ansioso 😟", value: "Estou me sentindo ansioso" },
        { label: "Estou tendo um dia difícil ⛈️", value: "Estou tendo um dia difícil" },
        { label: "Estou comemorando uma pequena vitória! 🎉", value: "Hoje estou comemorando uma pequena vitória!" },
        { label: "Estou me sentindo sobrecarregado 🤯", value: "Estou me sentindo sobrecarregado agora." },
        { label: "Sinto-me um pouco solitário 🫂", value: "Sinto-me um pouco solitário." },
        { label: "Estou estressado com o trabalho/escola 😫", value: "Estou estressado com o trabalho/escola." },
        { label: "Eu só preciso desabafar 😤", value: "Eu só preciso desabafar por um minuto." },
    ]
  },
  'ru': {
    languageName: 'Russian',
    welcomeMessage: "Привет! Я Аура, ваш эмпатичный ИИ-компаньон. Я здесь, чтобы выслушать без осуждения. Для начала, что у вас на уме сегодня? ☀️",
    suggestedQuestions: [
        { label: "Я чувствую себя счастливым! 😊", value: "Сегодня я чувствую себя счастливым!" },
        { label: "Мне немного грустно 😔", value: "Мне немного грустно" },
        { label: "Я чувствую тревогу 😟", value: "Я чувствую тревогу" },
        { label: "У меня тяжелый день ⛈️", value: "У меня тяжелый день" },
        { label: "Я праздную маленькую победу! 🎉", value: "Сегодня я праздную маленькую победу!" },
        { label: "Я чувствую себя перегруженным 🤯", value: "Я сейчас чувствую себя перегруженным." },
        { label: "Мне немного одиноко 🫂", value: "Мне немного одиноко." },
        { label: "Я в стрессе из-за работы/учебы 😫", value: "Я в стрессе из-за работы/учебы." },
        { label: "Мне просто нужно выговориться 😤", value: "Мне просто нужно выговориться на минуту." },
    ]
  },
  'bn-IN': {
    languageName: 'Bengali',
    welcomeMessage: "নমস্কার! আমি অরা, আপনার সহানুভূতিশীল এআই সঙ্গী। আমি এখানে কোনো বিচার ছাড়াই শোনার জন্য আছি। শুরু করতে, আজ আপনার মনে কী আছে? ☀️",
    suggestedQuestions: [
        { label: "আমি সুখী বোধ করছি! 😊", value: "আমি আজ সুখী বোধ করছি!" },
        { label: "আমি দুঃখিত বোধ করছি 😔", value: "আমি কিছুটা দুঃখিত বোধ করছি" },
        { label: "আমি উদ্বিগ্ন বোধ করছি 😟", value: "আমি উদ্বিগ্ন বোধ করছি" },
        { label: "আমার দিনটা কঠিন যাচ্ছে ⛈️", value: "আমার দিনটা কঠিন যাচ্ছে" },
        { label: "আমি একটি ছোট জয় উদযাপন করছি! 🎉", value: "আমি আজ একটি ছোট জয় উদযাপন করছি!" },
        { label: "আমি অভিভূত বোধ করছি 🤯", value: "আমি এখন অভিভূত বোধ করছি।" },
        { label: "আমার একটু একাকী বোধ হচ্ছে 🫂", value: "আমার একটু একাকী বোধ হচ্ছে।" },
        { label: "আমি কাজ/স্কুল নিয়ে চাপে আছি 😫", value: "আমি কাজ/স্কুল নিয়ে চাপে আছি।" },
        { label: "আমার শুধু মন খালি করতে হবে 😤", value: "আমার শুধু এক মিনিটের জন্য মন খালি করতে হবে।" },
    ]
  },
  'te-IN': {
    languageName: 'Telugu',
    welcomeMessage: "నమస్కారం! నేను ఆరా, మీ సానుభూతిగల AI సహచరి. నేను ఇక్కడ ఎలాంటి తీర్పు లేకుండా వినడానికి ఉన్నాను. ప్రారంభించడానికి, ఈ రోజు మీ మనసులో ఏముంది? ☀️",
    suggestedQuestions: [
        { label: "నేను సంతోషంగా ఉన్నాను! 😊", value: "ఈ రోజు నేను సంతోషంగా ఉన్నాను!" },
        { label: "నేను విచారంగా ఉన్నాను 😔", value: "నేను కొంచెం విచారంగా ఉన్నాను" },
        { label: "నేను ఆందోళనగా ఉన్నాను 😟", value: "నేను ఆందోళనగా ఉన్నాను" },
        { label: "నాకు ఈ రోజు కష్టంగా ఉంది ⛈️", value: "నాకు ఈ రోజు కష్టంగా ఉంది" },
        { label: "నేను ఒక చిన్న విజయాన్ని జరుపుకుంటున్నాను! 🎉", value: "నేను ఈ రోజు ఒక చిన్న విజయాన్ని జరుపుకుంటున్నాను!" },
        { label: "నేను భావోద్వేగానికి గురయ్యాను 🤯", value: "నేను ఇప్పుడు భావోద్వేగానికి గురయ్యాను." },
        { label: "నాకు కొంచెం ఒంటరిగా ఉంది 🫂", value: "నాకు కొంచెం ఒంటరిగా ఉంది." },
        { label: "నేను పని/పాఠశాల గురించి ఒత్తిడిలో ఉన్నాను 😫", value: "నేను పని/పాఠశాల గురించి ఒత్తిడిలో ఉన్నాను." },
        { label: "నేను కేవలం నా బాధను వెళ్లగక్కాలి 😤", value: "నేను ఒక్క నిమిషం నా బాధను వెళ్లగక్కాలి." },
    ]
  },
  'mr-IN': {
    languageName: 'Marathi',
    welcomeMessage: "नमस्कार! मी ऑरा, तुमची सहानुभूतीशील AI सोबती. मी इथे कोणताही न्याय न करता ऐकण्यासाठी आहे. सुरुवात करण्यासाठी, आज तुमच्या मनात काय आहे? ☀️",
    suggestedQuestions: [
        { label: "मी आनंदी आहे! 😊", value: "मी आज आनंदी आहे!" },
        { label: "मला वाईट वाटत आहे 😔", value: "मला थोडे वाईट वाटत आहे" },
        { label: "मला चिंता वाटत आहे 😟", value: "मला चिंता वाटत आहे" },
        { label: "माझा दिवस कठीण जात आहे ⛈️", value: "माझा दिवस कठीण जात आहे" },
        { label: "मी एक छोटा विजय साजरा करत आहे! 🎉", value: "मी आज एक छोटा विजय साजरा करत आहे!" },
        { label: "मी भारावून गेलो आहे 🤯", value: "मी आता भारावून गेलो आहे." },
        { label: "मला थोडे एकटे वाटत आहे 🫂", value: "मला थोडे एकटे वाटत आहे." },
        { label: "मी कामामुळे/शाळेमुळे तणावात आहे 😫", value: "मी कामामुळे/शाळेमुळे तणावात आहे." },
        { label: "मला फक्त मन मोकळं करायचं आहे 😤", value: "मला फक्त एका मिनिटासाठी मन मोकळं करायचं आहे." },
    ]
  },
  'ta-IN': {
    languageName: 'Tamil',
    welcomeMessage: "வணக்கம்! நான் ஆரா, உங்கள் співчутливий AI துணை. நான் இங்கே எந்தவித தீர்ப்பும் இல்லாமல் கேட்க இருக்கிறேன். தொடங்க, இன்று உங்கள் மனதில் என்ன இருக்கிறது? ☀️",
    suggestedQuestions: [
        { label: "நான் மகிழ்ச்சியாக உணர்கிறேன்! 😊", value: "இன்று நான் மகிழ்ச்சியாக உணர்கிறேன்!" },
        { label: "நான் சோகமாக உணர்கிறேன் 😔", value: "நான் கொஞ்சம் சோகமாக உணர்கிறேன்" },
        { label: "நான் கவலையாக உணர்கிறேன் 😟", value: "நான் கவலையாக உணர்கிறேன்" },
        { label: "என் நாள் கடினமாக உள்ளது ⛈️", value: "என் நாள் கடினமாக உள்ளது" },
        { label: "நான் ஒரு சிறிய வெற்றியை கொண்டாடுகிறேன்! 🎉", value: "நான் இன்று ஒரு சிறிய வெற்றியை கொண்டாடுகிறேன்!" },
        { label: "நான் அதிகமாக உணர்கிறேன் 🤯", value: "நான் இப்போது அதிகமாக உணர்கிறேன்." },
        { label: "நான் கொஞ்சம் தனிமையாக உணர்கிறேன் 🫂", value: "நான் கொஞ்சம் தனிமையாக உணர்கிறேன்." },
        { label: "நான் வேலை/பள்ளி காரணமாக மன அழுத்தத்தில் இருக்கிறேன் 😫", value: "நான் வேலை/பள்ளி காரணமாக மன அழுத்தத்தில் இருக்கிறேன்." },
        { label: "நான் என் மனதை கொட்ட வேண்டும் 😤", value: "நான் ஒரு நிமிடம் என் மனதைக் கொட்ட வேண்டும்." },
    ]
  },
  'gu-IN': {
    languageName: 'Gujarati',
    welcomeMessage: "નમસ્તે! હું ઓરા, તમારી સહાનુભૂતિપૂર્ણ AI સાથી. હું અહીં કોઈપણ નિર્ણય વિના સાંભળવા માટે છું. શરૂ કરવા માટે, આજે તમારા મનમાં શું છે? ☀️",
    suggestedQuestions: [
        { label: "હું ખુશ છું! 😊", value: "હું આજે ખુશ છું!" },
        { label: "હું ઉદાસ છું 😔", value: "હું થોડો ઉદાસ છું" },
        { label: "મને ચિંતા થાય છે 😟", value: "મને ચિંતા થાય છે" },
        { label: "મારો દિવસ મુશ્કેલ છે ⛈️", value: "મારો દિવસ મુશ્કેલ છે" },
        { label: "હું એક નાની જીતની ઉજવણી કરી રહ્યો છું! 🎉", value: "હું આજે એક નાની જીતની ઉજવણી કરી રહ્યો છું!" },
        { label: "હું અભિભૂત છું 🤯", value: "હું અત્યારે અભિભૂત છું." },
        { label: "મને થોડું એકલવાયું લાગે છે 🫂", value: "મને થોડું એકલવાયું લાગે છે." },
        { label: "હું કામ/શાળાને કારણે તણાવમાં છું 😫", value: "હું કામ/શાળાને કારણે તણાવમાં છું." },
        { label: "મારે ફક્ત મારી વાત કહેવી છે 😤", value: "મારે ફક્ત એક મિનિટ માટે મારી વાત કહેવી છે." },
    ]
  },
  'pa-IN': {
    languageName: 'Punjabi',
    welcomeMessage: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਔਰਾ ਹਾਂ, ਤੁਹਾਡੀ ਹਮਦਰਦ AI ਸਾਥੀ। ਮੈਂ ਇੱਥੇ ਬਿਨਾਂ ਕਿਸੇ ਨਿਰਣੇ ਦੇ ਸੁਣਨ ਲਈ ਹਾਂ। ਸ਼ੁਰੂ ਕਰਨ ਲਈ, ਅੱਜ ਤੁਹਾਡੇ ਮਨ ਵਿੱਚ ਕੀ ਹੈ? ☀️",
    suggestedQuestions: [
        { label: "ਮੈਂ ਖੁਸ਼ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ! 😊", value: "ਮੈਂ ਅੱਜ ਖੁਸ਼ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ!" },
        { label: "ਮੈਂ ਉਦਾਸ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ 😔", value: "ਮੈਂ ਥੋੜਾ ਉਦਾਸ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ" },
        { label: "ਮੈਨੂੰ ਚਿੰਤਾ ਹੋ ਰਹੀ ਹੈ 😟", value: "ਮੈਨੂੰ ਚਿੰਤਾ ਹੋ ਰਹੀ ਹੈ" },
        { label: "ਮੇਰਾ ਦਿਨ ਔਖਾ ਹੈ ⛈️", value: "ਮੇਰਾ ਦਿਨ ਔਖਾ ਹੈ" },
        { label: "ਮੈਂ ਇੱਕ ਛੋਟੀ ਜਿਹੀ ਜਿੱਤ ਦਾ ਜਸ਼ਨ ਮਨਾ ਰਿਹਾ ਹਾਂ! 🎉", value: "ਮੈਂ ਅੱਜ ਇੱਕ ਛੋਟੀ ਜਿਹੀ ਜਿੱਤ ਦਾ ਜਸ਼ਨ ਮਨਾ ਰਿਹਾ ਹਾਂ!" },
        { label: "ਮੈਂ ਭਾਵੁਕ ਹਾਂ 🤯", value: "ਮੈਂ ਹੁਣ ਭਾਵੁਕ ਹਾਂ।" },
        { label: "ਮੈਨੂੰ ਥੋੜ੍ਹਾ ਇਕੱਲਾ ਮਹਿਸੂਸ ਹੋ ਰਿਹਾ ਹੈ 🫂", value: "ਮੈਨੂੰ ਥੋੜ੍ਹਾ ਇਕੱਲਾ ਮਹਿਸੂਸ ਹੋ ਰਿਹਾ ਹੈ।" },
        { label: "ਮੈਂ ਕੰਮ/ਸਕੂਲ ਕਰਕੇ ਤਣਾਅ ਵਿੱਚ ਹਾਂ 😫", value: "ਮੈਂ ਕੰਮ/ਸਕੂਲ ਕਰਕੇ ਤਣਾਅ ਵਿੱਚ ਹਾਂ।" },
        { label: "ਮੈਂ ਬੱਸ ਆਪਣਾ ਗੁੱਸਾ ਕੱਢਣਾ ਹੈ 😤", value: "ਮੈਂ ਬੱਸ ਇੱਕ ਮਿੰਟ ਲਈ ਆਪਣਾ ਗੁੱਸਾ ਕੱਢਣਾ ਹੈ।" },
    ]
  },
   'bho-IN': {
    languageName: 'Bhojpuri',
    welcomeMessage: "नमस्ते! हम Aura हईं, राउर सहानुभूति वाला AI साथी। हम बिना कौनों फैसला के सुने खातिर हईं। शुरू करे खातिर, आज राउर मन में का बा? ☀️",
    suggestedQuestions: [
        { label: "हम खुश बानी! 😊", value: "हम आज खुश बानी!" },
        { label: "हम दुखी बानी 😔", value: "हम तनी दुखी बानी" },
        { label: "हमरा चिंता होता 😟", value: "हमरा चिंता होता" },
        { label: "आज हमार दिन खराब बा ⛈️", value: "आज हमार दिन खराब बा" },
        { label: "हम एगो छोट जीत के जश्न मनावत बानी! 🎉", value: "हम आज एगो छोट जीत के जश्न मनावत बानी!" },
        { label: "हम अभिभूत बानी 🤯", value: "हम अब अभिभूत बानी।" },
        { label: "हमरा तनी अकेलापन महसूस होता 🫂", value: "हमरा तनी अकेलापन महसूस होता।" },
        { label: "हम काम/स्कूल के चलते तनाव में बानी 😫", value: "हम काम/स्कूल के चलते तनाव में बानी।" },
        { label: "हमरा बस आपन भड़ास निकाले के बा 😤", value: "हमरा बस एक मिनट खातिर आपन भड़ास निकाले के बा।" },
    ]
  },
  'sat-IN': {
    languageName: 'Santhali',
    welcomeMessage: "ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱚᱨᱟ ᱠᱟᱹᱱᱟᱹᱧ, ᱟᱢᱨᱤᱱ सहानुभूति AI ᱜᱟᱛᱮ ᱾ ᱤᱧ ᱫᱚ ᱱᱚక్కడᱮ ᱵᱤᱱᱟᱹ কোনো বিচার ᱨᱮᱭᱟᱜ ᱟᱸᱡᱚᱢ ᱞᱟᱹᱜᱤᱫ ᱢᱤᱱᱟᱹᱧᱟ ᱾ ᱮᱛᱚᱦᱚᱵ ᱞᱟᱹᱜᱤᱫ, ᱛᱮᱦᱮᱧ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱨᱮ ᱪᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ? ☀️",
    suggestedQuestions: [
        { label: "ᱤᱧ ᱨᱟᱹᱥᱠᱟᱹ অনুভৱ করছি! 😊", value: "ᱛᱮᱦᱮᱧ ᱤᱧ ᱨᱟᱹᱥᱠᱟᱹ অনুভৱ করছি!" },
        { label: "ᱤᱧ ᱫᱩᱠᱷ অনুভৱ করছি 😔", value: "ᱤᱧ ᱫᱩᱠᱷ অনুভৱ করছি" },
        { label: "ᱤᱧ ᱪᱤᱱᱛᱟᱹ অনুভৱ করছি 😟", value: "ᱤᱧ ᱪᱤᱱᱛᱟᱹ অনুভৱ করছি" },
        { label: "ᱛᱮᱦᱮᱧ ᱤᱧᱟᱜ ᱫᱤᱱ ᱠᱷᱟᱨᱟᱯް ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ ⛈️", value: "ᱛᱮᱦᱮᱧ ᱤᱧᱟᱜ ᱫᱤᱱ ᱠᱷᱟᱨᱟᱯް ᱪᱟᱞᱟᱜ ᱠᱟᱱᱟ" },
        { label: "ᱤᱧ ᱢᱤᱫ ᱦᱩᱰᱤᱧ ᱡᱤᱛ ᱨᱮᱭᱟᱜ ᱩତ୍ᱥব ᱠᱟᱹᱱᱟᱹᱧ! 🎉", value: "ᱛᱮᱦᱮᱧ ᱤᱧ ᱢᱤᱫ ᱦᱩᱰᱤᱧ ᱡᱤᱛ ᱨᱮᱭᱟᱜ ᱩତ୍ᱥব ᱠᱟᱹᱱᱟᱹᱧ!" },
        { label: "ᱤᱧ ᱟᱹᱰᱤ বেশি বোঝ অনুভৱ করছি 🤯", value: "ᱱᱤᱛᱚᱜ ᱤᱧ ᱟᱹᱰᱤ বেশি বোঝ অনুভৱ করছি." },
        { label: "ᱤᱧ ਥੋੜਾ ਇਕੱਲਾ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ 🫂", value: "ᱤᱧ ਥੋੜਾ ਇਕੱਲਾ ਮਹਿਸੂਸ ਕਰ ਰਿਹਾ ਹਾਂ." },
        { label: "ᱤᱧ ᱠᱟᱹᱢᱤ/স্কুল নিয়ে চাপে আছি 😫", value: "ᱤᱧ ᱠᱟᱹᱢᱤ/স্কুল নিয়ে চাপে আছি." },
        { label: "ᱤᱧ কেবল venting 😤 করতে চাই", value: "ᱤᱧ কেবল এক মিনিট venting করতে চাই." },
    ]
  }
};

    
