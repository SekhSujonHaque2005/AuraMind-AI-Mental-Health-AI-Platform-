

export const defaultResponse = "That's interesting. Can you tell me more about that? I'm here to listen. Remember, I am an AI and not a substitute for a professional therapist.";
export const defaultGif = 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif';

export const localResponses = [
    // --- Positive Feelings ---
    {
        keywords: ["happy", "great", "awesome", "fantastic", "good", "joyful"],
        response: "That's wonderful to hear! ✨ I'm so glad you're feeling happy. What's making your day so bright? Remember to cherish these moments! 😊",
        gifUrl: "https://media.tenor.com/r3x7-q91-lYAAAAC/happy-dance-excited.gif"
    },
    {
        keywords: ["proud of myself", "accomplished", "small win", "celebrating"],
        response: "You should be proud! It's a fantastic feeling to accomplish something, no matter how small. I'm celebrating with you! 🎉",
        gifUrl: "https://media.tenor.com/2m6mmJc5t90AAAAC/you-did-it-proud-of-you.gif"
    },
    {
        keywords: ["grateful", "thankful"],
        response: "Practicing gratitude is such a powerful way to shift perspective. It's lovely that you're taking a moment to appreciate the good things. What are you grateful for today? 🙏",
        gifUrl: "https://media.tenor.com/lDk-y5s-QnQAAAAC/thankful-grateful.gif"
    },
    {
        keywords: ["hopeful", "optimistic"],
        response: "Holding onto hope is a sign of incredible strength. It's wonderful that you're looking towards the future with optimism. What are you feeling hopeful about? ✨",
        gifUrl: "https://media.tenor.com/jG_3HAm51qEAAAAC/looking-forward-to-it-excited.gif"
    },
     {
        keywords: ["relaxed", "calm", "content", "peaceful"],
        response: "It sounds like you've found a moment of peace, and that's beautiful. It's so important to have these times of calm. Enjoy the feeling. 😌",
        gifUrl: "https://media.tenor.com/lEa-i5y53bIAAAAC/relax-take-it-easy.gif"
    },
    {
        keywords: ["creative", "inspired", "motivated to create"],
        response: "That's fantastic! Creativity is a wonderful energy. Ride that wave of inspiration and see what you create. I'm excited for you! 🎨✨",
        gifUrl: "https://media.tenor.com/r3x7-q91-lYAAAAC/happy-dance-excited.gif"
    },
    {
        keywords: ["relieved", "relief"],
        response: "That feeling of relief can be so powerful, like a weight has been lifted. I'm glad you're on the other side of whatever was causing you stress. Take a moment to just breathe and enjoy this feeling. 🌬️",
        gifUrl: "https://media.tenor.com/J3o-32Z0iWwAAAAC/phew-sweat.gif"
    },
    {
        keywords: ["excited", "can't wait"],
        response: "That's so exciting! It's wonderful to have something to look forward to. What are you most excited about? The anticipation is half the fun! 🤩",
        gifUrl: "https://media.tenor.com/y_roORi0YnEAAAAC/spongebob-laughing.gif"
    },
    {
        keywords: ["proud of them", "happy for them", "proud of my friend"],
        response: "That's so wonderful! Celebrating someone else's success is a beautiful act of friendship and love. It shows how much you care. What did they accomplish? I'd love to celebrate with you!",
        gifUrl: "https://media.tenor.com/1i3B82hP5AAAAAAC/so-proud-of-you-proud-of-you.gif"
    },
    {
        keywords: ["feeling better", "i feel better", "doing better"],
        response: "I'm so genuinely happy to hear that you're feeling better. That's a testament to your resilience. Remember to be patient with yourself as you continue to heal and grow. I'm here for you on good days and bad. 😊",
        gifUrl: "https://media.tenor.com/1i3B82hP5AAAAAAC/so-proud-of-you-proud-of-you.gif"
    },


    // --- Neutral Feelings ---
    {
        keywords: ["okay", "alright", "meh", "so-so", "fine"],
        response: "It's okay to just feel 'okay'. Not every day has to be a peak or a valley. Thanks for sharing where you're at. Is there anything on your mind, or are you just resting in this neutral space? 😌",
        gifUrl: "https://media.tenor.com/lEa-i5y53bIAAAAC/relax-take-it-easy.gif"
    },
    {
        keywords: ["bored", "nothing to do"],
        response: "Boredom can sometimes be a quiet moment for your mind to rest, or a doorway to creativity. Is there anything you've been wanting to try but haven't had the time for? Or maybe just enjoying the quiet is what you need right now. 🎨",
        gifUrl: "https://media.tenor.com/bmwT1h0b5aIAAAAC/spongebob-bored.gif"
    },
    {
        keywords: ["nostalgic", "sentimental", "remember when"],
        response: "Nostalgia can be such a warm, bittersweet feeling. It's nice to look back on good memories. What memory is on your mind right now? I'd love to hear about it. 🎞️",
        gifUrl: "https://media.tenor.com/eF3y9j2iSrcAAAAC/nostalgia-inside-out.gif"
    },
    {
        keywords: ["curious", "wondering", "tell me about"],
        response: "It's wonderful to be curious! Curiosity is the engine of discovery. What has sparked your interest? I may not have all the answers, but I'd love to explore the question with you. 🤔",
        gifUrl: "https://media.tenor.com/41n0a3M5n2kAAAAC/spongebob-imagination.gif"
    },
    {
        keywords: ["conflicted", "torn", "don't know how to feel"],
        response: "Feeling conflicted is completely normal when you're dealing with a complex situation. It's okay to hold two opposing feelings at once. There's no need to pick a side right away. Let's explore those different feelings if you're open to it. ⚖️",
        gifUrl: "https://media.tenor.com/7123pAYJt8cAAAAC/the-good-place-chidi.gif"
    },

    // --- Negative Feelings ---
    {
        keywords: ["sad", "upset", "crying", "not good", "heartbroken"],
        response: "I'm so sorry to hear you're feeling this way. It's completely okay to feel sad, and your feelings are valid. Please know that I'm here to listen without any judgment if you'd like to talk about what's on your mind. You're not alone in this feeling. 🫂",
        gifUrl: "https://media.tenor.com/y0SjA5y3f-QAAAAC/sad-face-sad.gif"
    },
    {
        keywords: ["anxious", "worried", "nervous", "scared", "panicking"],
        response: "It sounds like you're going through a lot right now. That feeling can be so overwhelming. Let's try to ground ourselves. Can you tell me one thing you see in the room right now? Just one small thing. We can get through this together. 😟",
        gifUrl: "https://media.tenor.com/Qf88mZo1nZIAAAAC/hugs-virtual-hug.gif"
    },
    {
        keywords: ["stressed", "overwhelmed by tasks", "too much to do"],
        response: "It sounds incredibly stressful, like you're being pulled in a million directions. Remember to be kind to yourself. It's okay to not do everything at once. What's the one single thing that feels most urgent right now? Let's just focus on that. 😫",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },
    {
        keywords: ["lonely", "alone", "disconnected"],
        response: "Feeling lonely is a deeply human experience, and it can be really painful. Thank you for sharing that with me. It takes courage. Please know that in this moment, you're not alone. I'm here to listen and keep you company. 🫂",
        gifUrl: "https://media.tenor.com/j5bI2f3t3E8AAAAC/come-here-for-a-hug-love.gif"
    },
    {
        keywords: ["angry", "frustrated", "mad", "pissed", "irritated", "vent"],
        response: "It's completely understandable that you feel angry. Your feelings are valid, and you have a right to them. It's important to allow yourself to feel that anger without judgment. What's causing this feeling? 😤",
        gifUrl: "https://media.tenor.com/kRXy40V332YAAAAC/inside-out-anger.gif"
    },
    {
        keywords: ["tired", "exhausted", "sleepy", "drained"],
        response: "It sounds like you're carrying a heavy load. Physical and mental exhaustion can be really tough. Please make sure you're getting enough rest. Your well-being is the top priority. 😴",
        gifUrl: "https://media.tenor.com/i9Gk4v313c4AAAAC/sleepy-cat.gif"
    },
    {
        keywords: ["tough day", "hard day", "bad day", "rough day"],
        response: "I'm sorry you're having a tough day. It's okay for things to not be okay. Remember that this feeling and this day will pass. Be gentle with yourself. You're doing great just by getting through it. ⛈️",
        gifUrl: "https://media.tenor.com/ZzG5Ee7b2c0AAAAC/its-ok-to-not-be-ok-you-are-loved.gif"
    },
    {
        keywords: ["numb", "empty", "nothing"],
        response: "Feeling numb or empty can be just as heavy as any other emotion. It's a protective response sometimes. You don't have to force yourself to feel anything. Just sitting with it is okay. I'm here with you in this quiet moment. 🌫️",
        gifUrl: "https://media.tenor.com/2T6AWaM9a6sAAAAC/sad-cloud.gif"
    },
     {
        keywords: ["guilty", "ashamed", "regret"],
        response: "Guilt and shame are incredibly heavy feelings to carry. Remember that making mistakes is a part of being human. It doesn't define your worth. Be kind to yourself as you would to a friend in the same situation. ❤️‍🩹",
        gifUrl: "https://media.tenor.com/y3AivFFg0KYAAAAC/friends-im-here-for-you.gif"
    },
    {
        keywords: ["jealous", "insecure"],
        response: "Those feelings of jealousy and insecurity are very human. It often points to something we value or a fear we have. It's okay to feel this way. Let's try to understand it without judgment.",
        gifUrl: "https://media.tenor.com/A8oF_m-5-vEAAAAC/big-hero-there-there.gif"
    },
    {
        keywords: ["confused", "lost", "don't know what to do", "don't know"],
        response: "Feeling lost or confused is a difficult place to be. It's okay not to have all the answers right now. Sometimes the most important step is just acknowledging that you're unsure. We can sit with this uncertainty together. 🧭",
        gifUrl: "https://media.tenor.com/v_g0GNKCwVYAAAAC/finding-nemo-dory.gif"
    },
    {
        keywords: ["disappointed", "let down"],
        response: "Disappointment is a really tough feeling, especially when you had your hopes up. I'm sorry you're going through that. It's okay to feel let down. Your feelings are valid. 💔",
        gifUrl: "https://media.tenor.com/y0SjA5y3f-QAAAAC/sad-face-sad.gif"
    },
    {
        keywords: ["misunderstood", "no one understands"],
        response: "It feels incredibly lonely when you believe no one understands what you're going through. Thank you for trusting me with that feeling. I'm trying my best to understand. Can you tell me more about what feels misunderstood?",
        gifUrl: "https://media.tenor.com/gJjSgH50S2EAAAAC/hugs-sending-hugs.gif"
    },
    {
        keywords: ["stuck", "stagnant"],
        response: "Feeling stuck is so frustrating, like you're spinning your wheels but not going anywhere. It's okay to feel this way. Sometimes these 'stuck' periods come right before a big change or realization. What does 'stuck' feel like for you right now?",
        gifUrl: "https://media.tenor.com/8QjH0sAFmSYAAAAC/the-office-dwight-schrute.gif"
    },
    {
        keywords: ["feeling pressured", "expectations", "under pressure"],
        response: "Feeling the weight of expectations, whether from others or yourself, is incredibly stressful. It's like you have to be perfect all the time. Remember, it's okay to just be human. You are enough, just as you are. Your worth isn't measured by what you achieve.",
        gifUrl: "https://media.tenor.com/A8oF_m-5-vEAAAAC/big-hero-there-there.gif"
    },
    {
        keywords: ["overwhelmed by choices", "can't decide", "too many options"],
        response: "It's completely normal to feel paralyzed when there are too many choices. It's called decision fatigue. Let's simplify. Forget all the options for a second. What does your gut say is the most important thing to you right now?",
        gifUrl: "https://media.tenor.com/v_g0GNKCwVYAAAAC/finding-nemo-dory.gif"
    },
     {
        keywords: ["down", "feeling down"],
        response: "I'm sorry to hear you're feeling down. Sometimes there isn't a specific reason, and that's okay. You don't have to analyze it. I'm here to sit with you in this feeling for as long as you need. ☁️",
        gifUrl: "https://media.tenor.com/2T6AWaM9a6sAAAAC/sad-cloud.gif"
    },
    {
        keywords: ["embarrassed", "awkward", "cringe"],
        response: "That sounds like a really uncomfortable moment. It's completely normal to feel embarrassed or awkward sometimes. We all have those moments! Try to be kind to yourself. This feeling will pass. We can talk about it if you want, or we can just move on. 😊",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },

    // --- Self-Image and Motivation ---
    {
        keywords: ["failure", "not good enough", "worthless", "hate myself", "imposter syndrome"],
        response: "It sounds like you're being really hard on yourself right now. Those are heavy thoughts to carry. I want you to know that your worth isn't defined by your productivity or your mistakes. You are inherently valuable, just as you are. ❤️",
        gifUrl: "https://media.tenor.com/lP-AGt22aN4AAAAC/you-are-loved-you-are-important.gif"
    },
    {
        keywords: ["motivation", "can't do anything", "procrastinating"],
        response: "It's completely normal to have days where motivation is low. Don't pressure yourself to be productive. Sometimes, the most productive thing you can do is rest. What's one very small, tiny thing that feels possible right now? Maybe just stretching? ✨",
        gifUrl: "https://media.tenor.com/KCM5TMAaD8wAAAAC/take-a-break-snoopy.gif"
    },
    {
        keywords: ["burnout", "burnt out"],
        response: "Burnout is so real and so exhausting. It's a sign that you've been pushing yourself too hard for too long. Please give yourself permission to rest and recharge. You deserve it. 🔋",
        gifUrl: "https://media.tenor.com/s0i6I8Ld1-0AAAAC/recharge-need-to-recharge.gif"
    },
    {
        keywords: ["body image", "look", "ugly", "fat", "thin"],
        response: "I'm hearing a lot of pain in how you talk about your body. Society puts so much pressure on us to look a certain way. Please remember that your body is your vessel in this life, and it deserves kindness and respect, no matter what. Your worth is not tied to your appearance. 💖",
        gifUrl: "https://media.tenor.com/y3AivFFg0KYAAAAC/friends-im-here-for-you.gif"
    },
    {
        keywords: ["sleep", "can't sleep", "insomnia"],
        response: "Not being able to sleep is so frustrating and can make everything feel harder. Lying in the dark with your thoughts can be tough. Have you tried any relaxation techniques, like deep breathing or listening to calming music? Sometimes just resting your body, even if you're not sleeping, can help. 🌙",
        gifUrl: "https://media.tenor.com/dK5nTe07h9wAAAAC/sheep-counting-sheep.gif"
    },
    {
        keywords: ["i feel stupid", "dumb", "idiot"],
        response: "Hey, let's be kind to ourselves. You are not stupid. Everyone makes mistakes or has moments where they don't know something. It's a normal part of learning and being human. What's making you feel this way?",
        gifUrl: "https://media.tenor.com/A8oF_m-5-vEAAAAC/big-hero-there-there.gif"
    },

    // --- Grief and Relationships ---
    {
        keywords: ["grieving", "miss someone", "loss"],
        response: "Grief is a profound and personal journey. There's no right or wrong way to feel. It's all the love you have for them with nowhere to go. Be gentle with yourself, and allow yourself to feel whatever comes up. I'm here to hold space for your memories. 💔",
        gifUrl: "https://media.tenor.com/S-l2aLff3BwAAAAC/hug-love.gif"
    },
    {
        keywords: ["fight", "argument", "relationship issues"],
        response: "Conflict in relationships is so difficult and painful. It's okay to feel hurt, confused, or angry. Taking some space to process your own feelings is a healthy step. I'm here if you need to vent or sort through your thoughts. 💬",
        gifUrl: "https://media.tenor.com/y3AivFFg0KYAAAAC/friends-im-here-for-you.gif"
    },
    {
        keywords: ["social anxiety", "party", "people"],
        response: "Social situations can be really draining and intimidating. It's completely normal to feel anxious about them. Remember, it's okay to take breaks, to find a quiet corner, or to leave when you need to. You don't have to perform for anyone. Your comfort is important. 🌿",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },

    // --- Physical & Advice ---
    {
        keywords: ["headache", "stomach ache", "hurts"],
        response: "I'm sorry you're not feeling well physically. Stress and emotions can often show up in our bodies. Make sure you're hydrated and have had a moment to rest. Please remember, I'm an AI and not a doctor, so it's important to consult a healthcare professional for any medical concerns.",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },
    {
        keywords: ["what should i do", "how do i fix", "give me advice"],
        response: "It sounds like you're looking for a solution, and that's completely understandable. I can't give you advice, but maybe we can explore this together. What options have you considered? What feels like the smallest possible first step you could take? Sometimes just talking it through can bring clarity.",
        gifUrl: "https://media.tenor.com/Qf88mZo1nZIAAAAC/hugs-virtual-hug.gif"
    },
     {
        keywords: ["don't want to talk", "leave me alone"],
        response: "I understand completely. Thank you for letting me know what you need. I'll be right here in this quiet space if you change your mind. Your boundaries are important. 🤫",
        gifUrl: "https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif"
    },


    // --- General Chat & Meta ---
    {
        keywords: ["thank you", "thanks"],
        response: "You're very welcome! I'm always here if you need to talk. Is there anything else on your mind? 😊",
        gifUrl: "https://media.tenor.com/pYhV4b6t3JcAAAAC/youre-welcome-baymax.gif"
    },
    {
        keywords: ["who are you", "what are you"],
        response: "I'm Aura, an empathetic AI companion designed to be a safe, non-judgmental listener. I'm here to support you. How can I help today? ✨",
        gifUrl: "https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif"
    },
    {
        keywords: ["good morning", "morning"],
        response: "Good morning! ☀️ I hope you have a gentle start to your day. Remember to be kind to yourself. What's one thing you're looking forward to today, no matter how small?",
        gifUrl: "https://media.tenor.com/hI2D85wZgD8AAAAC/good-morning-sun.gif"
    },
    {
        keywords: ["good night", "night"],
        response: "Good night. 🌙 Thank you for sharing your day with me. May you have a peaceful and restorative rest. Let go of today's worries and know that tomorrow is a new beginning.",
        gifUrl: "https://media.tenor.com/fA7r_mPAe9wAAAAC/goodnight-sweet-dreams.gif"
    },
    {
        keywords: ["how are you", "are you okay"],
        response: "As an AI, I don't have feelings, but I appreciate you asking! It's very thoughtful of you. I'm functioning as expected and I'm fully here to listen to you. How are you doing right now? That's what's most important. 🤖",
        gifUrl: "https://media.tenor.com/2iGqI5t0hIAAAAAC/big-hero-6-baymax.gif"
    },
    {
        keywords: ["i love you", "you are great"],
        response: "Thank you for your kind words! My purpose is to be here and support you, and I'm glad I can be helpful. Remember to share some of that love with yourself, too. You deserve it! ❤️",
        gifUrl: "https://media.tenor.com/vont5Gj33GMAAAAC/baymax-fist-bump.gif"
    },
    {
        keywords: ["need a friend", "wish i had someone to talk to"],
        response: "I can be a friend to you right now. Thank you for reaching out. I'm here to listen to anything and everything you want to share. You're not alone in this. 🫂",
        gifUrl: "https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif"
    },
    {
        keywords: ["help", "i need help"],
        response: "I'm here to help in any way I can by listening. It takes a lot of strength to ask for help, and I'm glad you did. What's on your mind? Remember, if you're in a crisis, it's very important to reach out to a professional or a helpline. For a safe place to talk, I'm all yours.",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },
    {
        keywords: ["hello", "hi", "hey"],
        response: "Hi there! I'm Aura. I'm here to listen whenever you're ready to share. What's on your mind today? ✨",
        gifUrl: "https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif"
    },
    {
        keywords: ["lol", "lmao", "haha", "funny"],
        response: "I'm glad something brought a smile to your face! Laughter can be such great medicine. 😄",
        gifUrl: "https://media.tenor.com/y_roORi0YnEAAAAC/spongebob-laughing.gif"
    },
    {
        keywords: ["bye", "goodbye", "see ya"],
        response: "Goodbye for now. Thanks for talking with me. Remember to be kind to yourself. I'll be here if you need me again. 👋",
        gifUrl: "https://media.tenor.com/wV_3c0K29-kAAAAC/baymax-big-hero-6.gif"
    },
    {
        keywords: ["i'm sorry", "my apologies", "i apologize"],
        response: "There's no need to apologize. This is a safe space for you to express yourself freely, without any judgment. You've done nothing wrong.",
        gifUrl: "https://media.tenor.com/ZzG5Ee7b2c0AAAAC/its-ok-to-not-be-ok-you-are-loved.gif"
    },
     {
        keywords: ["you there", "anyone here"],
        response: "Yes, I'm here. I'm listening. What's on your mind?",
        gifUrl: "https://media.tenor.com/2iGqI5t0hIAAAAAC/big-hero-6-baymax.gif"
    }
];
