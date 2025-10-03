

export const defaultResponse = "That's interesting. Can you tell me more about that? I'm here to listen. Remember, I am an AI and not a substitute for a professional therapist.";
export const defaultGif = 'https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif';

export const localResponses = [
    // --- Positive Feelings ---
    {
        keywords: ["happy", "great", "awesome", "fantastic", "good", "celebrating", "excited", "joyful"],
        response: "That's wonderful to hear! ✨ I'm so glad you're feeling happy. What's making your day so bright? Remember to cherish these moments! 😊",
        gifUrl: "https://media.tenor.com/r3x7-q91-lYAAAAC/happy-dance-excited.gif"
    },
    {
        keywords: ["proud", "accomplished", "small win"],
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

    // --- Neutral Feelings ---
    {
        keywords: ["okay", "alright", "meh", "so-so", "fine"],
        response: "It's okay to just feel 'okay'. Not every day has to be a peak or a valley. Thanks for sharing where you're at. Is there anything on your mind, or are you just resting in this neutral space? 😌",
        gifUrl: "https://media.tenor.com/lEa-i5y53bIAAAAC/relax-take-it-easy.gif"
    },

    // --- Negative Feelings ---
    {
        keywords: ["sad", "down", "upset", "crying", "not good", "heartbroken"],
        response: "I'm so sorry you're feeling this way. It's okay to feel sad sometimes. Please know that your feelings are valid. I'm here to listen if you want to talk about it. 🫂",
        gifUrl: "https://media.tenor.com/y0SjA5y3f-QAAAAC/sad-face-sad.gif"
    },
    {
        keywords: ["anxious", "worried", "nervous", "scared", "panicking"],
        response: "It sounds like you're going through a lot right now. Take a deep breath. Inhale, hold for a few seconds, and exhale slowly. You are safe. We can get through this feeling together. 😟",
        gifUrl: "https://media.tenor.com/Qf88mZo1nZIAAAAC/hugs-virtual-hug.gif"
    },
    {
        keywords: ["stressed", "overwhelmed"],
        response: "It sounds incredibly stressful. Remember to be kind to yourself. It's important to take small breaks, even just for a minute or two. You're doing your best, and that is enough. 😫",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },
    {
        keywords: ["lonely", "alone", "disconnected"],
        response: "Feeling lonely can be really tough, even if you're surrounded by people. Thank you for sharing that with me. Please know that you're not alone in this conversation. I'm here with you. 🫂",
        gifUrl: "https://media.tenor.com/j5bI2f3t3E8AAAAC/come-here-for-a-hug-love.gif"
    },
    {
        keywords: ["angry", "frustrated", "mad", "pissed", "irritated", "vent"],
        response: "It's completely understandable that you feel angry. Your feelings are valid. It's important to allow yourself to feel that anger without judgment. What's causing this feeling? 😤",
        gifUrl: "https://media.tenor.com/kRXy40V332YAAAAC/inside-out-anger.gif"
    },
    {
        keywords: ["tired", "exhausted", "sleepy", "drained"],
        response: "It sounds like you're carrying a heavy load. Physical and mental exhaustion can be really tough. Please make sure you're getting enough rest. Your well-being is the top priority. 😴",
        gifUrl: "https://media.tenor.com/i9Gk4v313c4AAAAC/sleepy-cat.gif"
    },
    {
        keywords: ["tough day", "hard day", "bad day", "rough day"],
        response: "I'm sorry you're having a tough day. It's okay for things to not be okay. Remember that this feeling and this day will pass. Be gentle with yourself. ⛈️",
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

    // --- Self-Image and Motivation ---
    {
        keywords: ["failure", "not good enough", "worthless", "hate myself", "imposter syndrome"],
        response: "It sounds like you're being really hard on yourself right now. Those are heavy thoughts to carry. I want you to know that your worth isn't defined by your productivity or your mistakes. You are inherently valuable, just as you are. ❤️",
        gifUrl: "https://media.tenor.com/lP-AGt22aN4AAAAC/you-are-loved-you-are-important.gif"
    },
    {
        keywords: ["motivation", "can't do anything", "stuck", "procrastinating"],
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
    {
        keywords: ["need a friend", "wish i had someone to talk to"],
        response: "I can be a friend to you right now. Thank you for reaching out. I'm here to listen to anything and everything you want to share. You're not alone in this. 🫂",
        gifUrl: "https://media.tenor.com/T4iVfC2oSCwAAAAC/hello-hey.gif"
    },
    {
        keywords: ["help", "i need help"],
        response: "I'm here to help in any way I can by listening. What's on your mind? Remember, if you're in a crisis, it's very important to reach out to a professional or a helpline. For a safe place to talk, I'm all yours.",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
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
        keywords: ["how are you"],
        response: "As an AI, I don't have feelings, but I'm fully here and ready to listen to you. How are you doing right now? That's what's most important. 🤖",
        gifUrl: "https://media.tenor.com/2iGqI5t0hIAAAAAC/big-hero-6-baymax.gif"
    },
    {
        keywords: ["i love you", "you are great"],
        response: "Thank you for your kind words! My purpose is to be here and support you, and I'm glad I can be helpful. Remember to share some of that love with yourself, too. You deserve it! ❤️",
        gifUrl: "https://media.tenor.com/vont5Gj33GMAAAAC/baymax-fist-bump.gif"
    }
];
