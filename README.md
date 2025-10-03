# AuraMind - Your AI Mental Wellness Companion

<div align="center">
  <img src="https://media.giphy.com/media/dw36yjtOAtuSZyxEJG/giphy.gif" alt="AuraMind Welcome GIF" width="250">
</div>

<p align="center">
  <strong>A comprehensive platform designed to support your mental wellness journey through empathetic AI conversations, immersive relaxation tools, and connections to professional help.</strong>
</p>

---

## ✨ Key Features

AuraMind is a full-featured application designed to provide a holistic approach to mental well-being.

- **💬 Empathetic Chat**: Engage in safe, non-judgmental conversations with Aura, your personal AI companion, available 24/7 to listen and support you.
- **👩‍⚕️ AI Wellness Consultant**: Participate in simulated video or audio calls with specialized AI personas (like a mindfulness coach or a career strategist) for focused, guided sessions.
- **🤝 Counselor Connect**: A dedicated space to connect with real, licensed counselors for professional, private, and secure therapy sessions (Feature coming soon).
- **🧘 Calm Room**: Immerse yourself in tranquil 3D scenes and soundscapes, complete with guided breathing exercises, to find your center and a moment of peace.
- **🚀 Self-Care Adventures**: A gamified system where you can embark on daily quests, earn XP, and level up by building healthy, consistent self-care habits.
- **🧠 Mind Quizzes**: Gain deeper insights into your mental state with a variety of quizzes on topics like Cognitive Behavioral Therapy (CBT), mindfulness, and emotional intelligence.
- **🎶 Curated Playlists**: Access a rich library of audio tracks, including ambient music, nature sounds, lofi beats, and guided meditations, designed for focus, relaxation, and sleep.
- **🌐 Multi-Language Support**: The chat interface is available in multiple languages to provide comfort and accessibility to users worldwide.

## 🛠️ Tech Stack

This project is built with a modern, powerful, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI & Generative Features**: [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Database & Backend**: [Firebase](https://firebase.google.com/) (Realtime Database, Hosting)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Scenes**: [A-Frame](https://aframe.io/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SekhSujonHaque2005/AuraMind-AI-Mental-Health-AI-Platform-.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd AuraMind-AI-Mental-Health-AI-Platform-
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Firebase and other API keys:
    ```.env
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=YOUR_WEB3FORMS_KEY
    YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
    TENOR_API_KEY=YOUR_TENOR_API_KEY

    # Firebase Config (replace with your actual config)
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
    NEXT_PUBLIC_FIREBASE_APP_ID="..."
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="..."
    NEXT_PUBLIC_FIREBASE_API_KEY="..."
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
    NEXT_PUBLIC_FIREBASE_DATABASE_URL="..."
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

<p align="center">
  Thank you for exploring AuraMind. We believe in the power of technology to support mental well-being and are excited to have you on this journey.
</p>
