export interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
}

export interface TutorialStep {
  image: string; // Placeholder color or URL
  text: string;
  voiceText: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  mcq: MCQ;
}

export const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "How to Make a Video Call on WhatsApp",
    description: "Learn to connect with your family using WhatsApp video calls.",
    steps: [
      {
        image: "bg-green-100 text-green-600",
        text: "Step 1: Open WhatsApp on your phone. Tap the green icon with a phone inside.",
        voiceText: "Open WhatsApp on your phone. Tap the green icon with a phone inside.",
      },
      {
        image: "bg-blue-100 text-blue-600",
        text: "Step 2: Tap on the contact you want to call.",
        voiceText: "Tap on the contact you want to call.",
      },
      {
        image: "bg-yellow-100 text-yellow-600",
        text: "Step 3: Look for the video camera icon at the top right corner and tap it.",
        voiceText: "Look for the video camera icon at the top right corner and tap it.",
      },
      {
        image: "bg-red-100 text-red-600",
        text: "Step 4: Wait for them to answer. To end the call, tap the red phone button.",
        voiceText: "Wait for them to answer. To end the call, tap the red phone button.",
      },
    ],
    mcq: {
      question: "Which icon do you tap to start a video call?",
      options: ["The phone icon", "The video camera icon", "The microphone icon"],
      correctAnswer: 1,
    },
  },
  {
    id: "2",
    title: "Sending a Voice Message",
    description: "Easily send voice notes instead of typing.",
    steps: [
      {
        image: "bg-purple-100 text-purple-600",
        text: "Step 1: Open a chat with a friend.",
        voiceText: "Open a chat with a friend.",
      },
      {
        image: "bg-indigo-100 text-indigo-600",
        text: "Step 2: Press and hold the microphone icon next to the text box.",
        voiceText: "Press and hold the microphone icon next to the text box.",
      },
      {
        image: "bg-pink-100 text-pink-600",
        text: "Step 3: Speak your message while holding the button.",
        voiceText: "Speak your message while holding the button.",
      },
      {
        image: "bg-orange-100 text-orange-600",
        text: "Step 4: Release the button to send the message.",
        voiceText: "Release the button to send the message.",
      },
    ],
    mcq: {
      question: "What do you do to record a message?",
      options: ["Tap the microphone once", "Press and hold the microphone icon", "Tap the camera icon"],
      correctAnswer: 1,
    },
  },
];
