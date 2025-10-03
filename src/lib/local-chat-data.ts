
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
        keywords: ["proud", "accomplished"],
        response: "You should be proud! It's a fantastic feeling to accomplish something you've worked for. I'm celebrating with you! 🎉",
        gifUrl: "https://media.tenor.com/2m6mmJc5t90AAAAC/you-did-it-proud-of-you.gif"
    },
    {
        keywords: ["grateful", "thankful"],
        response: "Practicing gratitude is such a powerful way to shift perspective. It's lovely that you're taking a moment to appreciate the good things. What are you grateful for today? 🙏",
        gifUrl: "https://media.tenor.com/lDk-y5s-QnQAAAAC/thankful-grateful.gif"
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
        keywords: ["stressed", "overwhelmed", "work", "school"],
        response: "It sounds incredibly stressful. Remember to be kind to yourself. It's important to take small breaks, even just for a minute or two. You're doing your best, and that is enough. 😫",
        gifUrl: "https://media.tenor.com/hYm5lD-3s-wAAAAC/big-hero6-baymax.gif"
    },
    {
        keywords: ["lonely", "alone"],
        response: "Feeling lonely can be really tough. Thank you for sharing that with me. Please know that you're not alone in this conversation. I'm here with you. 🫂",
        gifUrl: "https://media.tenor.com/j5bI2f3t3E8AAAAC/come-here-for-a-hug-love.gif"
    },
    {
        keywords: ["angry", "frustrated", "mad", "pissed", "irritated"],
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

    // --- Self-Image and Motivation ---
    {
        keywords: ["failure", "not good enough", "worthless", "hate myself"],
        response: "It sounds like you're being really hard on yourself right now. Those are heavy thoughts to carry. I want you to know that your worth isn't defined by your productivity or your mistakes. You are inherently valuable, just as you are. ❤️",
        gifUrl: "https://media.tenor.com/lP-AGt22aN4AAAAC/you-are-loved-you-are-important.gif"
    },
    {
        keywords: ["motivation", "can't do anything", "stuck"],
        response: "It's completely normal to have days where motivation is low. Don't pressure yourself to be productive. Sometimes, the most productive thing you can do is rest. What's one very small, tiny thing that feels possible right now? Maybe just stretching? ✨",
        gifUrl: "https://media.tenor.com/KCM5TMAaD8wAAAAC/take-a-break-snoopy.gif"
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

    // --- General Chat ---
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
    }
];
