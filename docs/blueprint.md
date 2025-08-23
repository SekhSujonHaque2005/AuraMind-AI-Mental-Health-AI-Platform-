# **App Name**: AuraMind

## Core Features:

- User Authentication: Implements Firebase Authentication using Email/Password and Google Sign-In to ensure secure user access and profile management.
- Chat Interface: Presents a minimalist chat screen, the main interface, with distinct user and bot message styles in a scrollable format. Features a text input and send button for interactive communication.
- AI Chatbot: Employs an AI Chatbot via a Firebase Cloud Function using the Gemini API. It uses a tool with a system prompt that embodies a supportive AI companion (Aura), prioritizing empathetic listening, offering comfort, and explicitly avoiding medical advice, coupled with a disclaimer about its AI nature.
- Critical Safety: Integrates a real-time safety protocol within the cloud function to detect high-risk keywords related to self-harm or crisis situations. It uses a tool forgoes the Gemini API call in favor of delivering immediate, non-AI crisis resource information, ensuring swift user support.
- Resources Screen: Offers a static 'Resources' screen, accessible through a bottom navigation bar, presenting a curated list of mental health organizations, websites, and hotlines with clickable links and phone numbers for easy access to support networks.

## Style Guidelines:

- Primary color: Soft lavender (#E6E6FA) to promote a sense of calm and peace.
- Background color: Light, desaturated off-white (#F5F5F5) for a clean and unobtrusive backdrop.
- Accent color: Pale blue (#ADD8E6) for interactive elements and highlights.
- Body and headline font: 'PT Sans' (sans-serif) for readability and a modern feel.
- Use soft, rounded icons in a light gray to maintain a gentle, approachable interface.
- Maintain generous spacing and padding to give the interface a spacious and calming feel. Avoid clutter.
- Incorporate subtle, gentle animations for transitions and feedback, avoiding any jarring or sudden movements.