export interface QuizQuestion {
  question: string;
  questionHi: string;
  options: { text: string; correct: boolean }[];
}

export interface Module {
  id: string;
  category: "basics" | "coding" | "trending";
  title: string;
  titleHi: string;
  description: string;
  descHi: string;
  videoId: string;
  codeSnippet?: string;
  questions: QuizQuestion[];
  completed: boolean;
}

export const modules: Module[] = [
  // --- Computer Basics ---
  {
    id: "comp-fund",
    category: "basics",
    title: "Computer Fundamentals",
    titleHi: "कंप्यूटर के मूल सिद्धांत",
    description: "Understand hardware, software, and how computers work.",
    descHi: "हार्डवेयर, सॉफ्टवेयर और कंप्यूटर कैसे काम करते हैं, इसे समझें।",
    videoId: "imQyyk9SOr8", // Placeholder video ID
    questions: [
      {
        question: "What is the brain of the computer?",
        questionHi: "कंप्यूटर का दिमाग किसे कहा जाता है?",
        options: [
          { text: "CPU", correct: true },
          { text: "RAM", correct: false },
          { text: "Hard Disk", correct: false },
          { text: "Monitor", correct: false },
        ],
      },
      {
        question: "Which of these is an input device?",
        questionHi: "इनमें से कौन सा इनपुट डिवाइस है?",
        options: [
          { text: "Keyboard", correct: true },
          { text: "Speaker", correct: false },
          { text: "Printer", correct: false },
          { text: "Monitor", correct: false },
        ],
      },
      {
        question: "RAM stands for?",
        questionHi: "RAM का पूर्ण रूप क्या है?",
        options: [
          { text: "Random Access Memory", correct: true },
          { text: "Read Access Memory", correct: false },
          { text: "Ready Access Memory", correct: false },
          { text: "Random Active Memory", correct: false },
        ],
      },
      {
        question: "What software manages the computer hardware?",
        questionHi: "कंप्यूटर हार्डवेयर को कौन सा सॉफ्टवेयर प्रबंधित करता है?",
        options: [
          { text: "Operating System", correct: true },
          { text: "Web Browser", correct: false },
          { text: "Media Player", correct: false },
          { text: "Antivirus", correct: false },
        ],
      },
      {
        question: "Which component stores data permanently?",
        questionHi: "कौन सा घटक डेटा को स्थायी रूप से संग्रहीत करता है?",
        options: [
          { text: "Hard Drive / SSD", correct: true },
          { text: "RAM", correct: false },
          { text: "Cache", correct: false },
          { text: "CPU Register", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "ms-word",
    category: "basics",
    title: "Microsoft Word",
    titleHi: "माइक्रोसॉफ्ट वर्ड",
    description: "Learn to create documents, format text, and use styles.",
    descHi: "दस्तावेज़ बनाना, टेक्स्ट फ़ॉर्मेट करना और स्टाइल्स का उपयोग करना सीखें।",
    videoId: "S-nHYzK-BVg",
    questions: [
      {
        question: "What is the shortcut to save a document?",
        questionHi: "दस्तावेज़ को सहेजने के लिए शॉर्टकट क्या है?",
        options: [
          { text: "Ctrl + S", correct: true },
          { text: "Ctrl + C", correct: false },
          { text: "Ctrl + P", correct: false },
          { text: "Ctrl + V", correct: false },
        ],
      },
      {
        question: "Which tab contains the Font options?",
        questionHi: "फ़ॉन्ट विकल्प किस टैब में होते हैं?",
        options: [
          { text: "Home", correct: true },
          { text: "Insert", correct: false },
          { text: "Design", correct: false },
          { text: "View", correct: false },
        ],
      },
      {
        question: "What is the extension of a Word file?",
        questionHi: "वर्ड फ़ाइल का एक्सटेंशन क्या होता है?",
        options: [
          { text: ".docx", correct: true },
          { text: ".txt", correct: false },
          { text: ".pdf", correct: false },
          { text: ".xlsx", correct: false },
        ],
      },
      {
        question: "To make text bold, you use?",
        questionHi: "टेक्स्ट को बोल्ड करने के लिए आप क्या उपयोग करते हैं?",
        options: [
          { text: "Ctrl + B", correct: true },
          { text: "Ctrl + I", correct: false },
          { text: "Ctrl + U", correct: false },
          { text: "Ctrl + Z", correct: false },
        ],
      },
      {
        question: "Which feature corrects spelling mistakes?",
        questionHi: "कौन सी सुविधा वर्तनी की गलतियों को सुधारती है?",
        options: [
          { text: "Spell Check", correct: true },
          { text: "Format Painter", correct: false },
          { text: "Macro", correct: false },
          { text: "Mail Merge", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "ms-excel",
    category: "basics",
    title: "Microsoft Excel",
    titleHi: "माइक्रोसॉफ्ट एक्सेल",
    description: "Master spreadsheets, formulas, and data organization.",
    descHi: "स्प्रेडशीट, फ़ार्मुलों और डेटा संगठन में महारत हासिल करें।",
    videoId: "k1VUZEVuDJ8",
    questions: [
      {
        question: "What is a single box in a worksheet called?",
        questionHi: "वर्कशीट में एक सिंगल बॉक्स को क्या कहा जाता है?",
        options: [
          { text: "Cell", correct: true },
          { text: "Block", correct: false },
          { text: "Square", correct: false },
          { text: "Grid", correct: false },
        ],
      },
      {
        question: "Formulas in Excel start with which symbol?",
        questionHi: "एक्सेल में फ़ार्मुलों की शुरुआत किस प्रतीक से होती है?",
        options: [
          { text: "=", correct: true },
          { text: "#", correct: false },
          { text: "+", correct: false },
          { text: "@", correct: false },
        ],
      },
      {
        question: "Which function sums up numbers?",
        questionHi: "कौन सा फ़ंक्शन संख्याओं का योग करता है?",
        options: [
          { text: "SUM()", correct: true },
          { text: "ADD()", correct: false },
          { text: "TOTAL()", correct: false },
          { text: "COUNT()", correct: false },
        ],
      },
      {
        question: "Vertical arrangement of cells is called?",
        questionHi: "कोशिकाओं की लंबवत व्यवस्था को क्या कहा जाता है?",
        options: [
          { text: "Column", correct: true },
          { text: "Row", correct: false },
          { text: "Line", correct: false },
          { text: "Stack", correct: false },
        ],
      },
      {
        question: "What file extension does Excel use?",
        questionHi: "एक्सेल किस फ़ाइल एक्सटेंशन का उपयोग करता है?",
        options: [
          { text: ".xlsx", correct: true },
          { text: ".docx", correct: false },
          { text: ".pptx", correct: false },
          { text: ".txt", correct: false },
        ],
      },
    ],
    completed: false,
  },

  // --- Coding ---
  {
    id: "html-basics",
    category: "coding",
    title: "HTML Basics",
    titleHi: "HTML मूल बातें",
    description: "Learn the building blocks of the web — tags, elements, and your first webpage.",
    descHi: "वेब की बुनियाद सीखें — टैग, एलिमेंट्स, और आपका पहला वेबपेज।",
    videoId: "qz0aGYrrlhU",
    codeSnippet: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, SheRise!</h1>
    <p>I am learning HTML 🎉</p>
  </body>
</html>`,
    questions: [
      {
        question: "Which tag is used for the largest heading?",
        questionHi: "सबसे बड़ी हेडिंग के लिए कौन सा टैग उपयोग होता है?",
        options: [
          { text: "<h1>", correct: true },
          { text: "<h6>", correct: false },
          { text: "<p>", correct: false },
          { text: "<head>", correct: false },
        ],
      },
      {
        question: "HTML stands for?",
        questionHi: "HTML का पूर्ण रूप क्या है?",
        options: [
          { text: "HyperText Markup Language", correct: true },
          { text: "HighText Machine Language", correct: false },
          { text: "HyperText and Links Markup Language", correct: false },
          { text: "None of these", correct: false },
        ],
      },
      {
        question: "Which tag creates a paragraph?",
        questionHi: "कौन सा टैग पैराग्राफ बनाता है?",
        options: [
          { text: "<p>", correct: true },
          { text: "<br>", correct: false },
          { text: "<div>", correct: false },
          { text: "<span>", correct: false },
        ],
      },
      {
        question: "What is the correct tag for inserting an image?",
        questionHi: "इमेज डालने के लिए सही टैग क्या है?",
        options: [
          { text: "<img>", correct: true },
          { text: "<image>", correct: false },
          { text: "<pic>", correct: false },
          { text: "<src>", correct: false },
        ],
      },
      {
        question: "Closing tags usually start with?",
        questionHi: "क्लोजिंग टैग आमतौर पर किससे शुरू होते हैं?",
        options: [
          { text: "/", correct: true },
          { text: "\\", correct: false },
          { text: "*", correct: false },
          { text: "#", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "css-intro",
    category: "coding",
    title: "CSS Styling",
    titleHi: "CSS स्टाइलिंग",
    description: "Make your pages beautiful with colors, fonts, and layouts.",
    descHi: "रंगों, फॉन्ट्स और लेआउट के साथ अपने पेज सुंदर बनाएं।",
    videoId: "1PnVor36_40",
    codeSnippet: `/* style.css */
body {
  background-color: #fff5ee;
  font-family: 'Arial', sans-serif;
}
h1 {
  color: #d4622a;
  text-align: center;
}`,
    questions: [
      {
        question: "Which property changes the text color?",
        questionHi: "कौन सी प्रॉपर्टी टेक्स्ट का रंग बदलती है?",
        options: [
          { text: "color", correct: true },
          { text: "background-color", correct: false },
          { text: "font-size", correct: false },
          { text: "text-align", correct: false },
        ],
      },
      {
        question: "What does CSS stand for?",
        questionHi: "CSS का पूर्ण रूप क्या है?",
        options: [
          { text: "Cascading Style Sheets", correct: true },
          { text: "Computer Style Sheets", correct: false },
          { text: "Creative Style Sheets", correct: false },
          { text: "Colorful Style Sheets", correct: false },
        ],
      },
      {
        question: "Which property changes the font size?",
        questionHi: "कौन सी प्रॉपर्टी फ़ॉन्ट आकार बदलती है?",
        options: [
          { text: "font-size", correct: true },
          { text: "text-size", correct: false },
          { text: "font-style", correct: false },
          { text: "text-font", correct: false },
        ],
      },
      {
        question: "To select an element with id 'header', use?",
        questionHi: "'header' आईडी वाले तत्व का चयन करने के लिए, उपयोग करें?",
        options: [
          { text: "#header", correct: true },
          { text: ".header", correct: false },
          { text: "header", correct: false },
          { text: "*header", correct: false },
        ],
      },
      {
        question: "Which property adds space inside the border?",
        questionHi: "बॉर्डर के अंदर स्पेस कौन सी प्रॉपर्टी जोड़ती है?",
        options: [
          { text: "padding", correct: true },
          { text: "margin", correct: false },
          { text: "border-spacing", correct: false },
          { text: "spacing", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "python-intro",
    category: "coding",
    title: "Python Basics",
    titleHi: "पायथन मूल बातें",
    description: "Start programming with Python — variables, print, and simple math.",
    descHi: "पायथन के साथ प्रोग्रामिंग शुरू करें — वेरिएबल्स, प्रिंट, और गणित।",
    videoId: "kqtD5dpn9C8",
    codeSnippet: `name = "Priya"
print(f"Hello, {name}!")`,
    questions: [
      {
        question: "What does print() do in Python?",
        questionHi: "Python में print() क्या करता है?",
        options: [
          { text: "Displays output on screen", correct: true },
          { text: "Creates a new file", correct: false },
          { text: "Deletes a variable", correct: false },
          { text: "Opens a browser", correct: false },
        ],
      },
      {
        question: "How do you create a variable?",
        questionHi: "आप एक वेरिएबल कैसे बनाते हैं?",
        options: [
          { text: "x = 5", correct: true },
          { text: "var x = 5", correct: false },
          { text: "int x = 5", correct: false },
          { text: "variable x = 5", correct: false },
        ],
      },
      {
        question: "Which symbol is used for comments?",
        questionHi: "टिप्पणियों के लिए किस प्रतीक का उपयोग किया जाता है?",
        options: [
          { text: "#", correct: true },
          { text: "//", correct: false },
          { text: "/*", correct: false },
          { text: "--", correct: false },
        ],
      },
      {
        question: "What is the output of 3 + 4 * 2?",
        questionHi: "3 + 4 * 2 का आउटपुट क्या है?",
        options: [
          { text: "11", correct: true },
          { text: "14", correct: false },
          { text: "7", correct: false },
          { text: "24", correct: false },
        ],
      },
      {
        question: "Which data type is 'Hello'?",
        questionHi: "'Hello' किस प्रकार का डेटा है?",
        options: [
          { text: "String", correct: true },
          { text: "Integer", correct: false },
          { text: "Float", correct: false },
          { text: "List", correct: false },
        ],
      },
    ],
    completed: false,
  },

  // --- Trending Tech ---
  {
    id: "ai-intro",
    category: "trending",
    title: "What is AI?",
    titleHi: "AI क्या है?",
    description: "Introduction to Artificial Intelligence — how machines learn and think.",
    descHi: "कृत्रिम बुद्धिमत्ता का परिचय — मशीनें कैसे सीखती और सोचती हैं।",
    videoId: "ad79nYk2keg",
    questions: [
      {
        question: "AI stands for?",
        questionHi: "AI का पूरा नाम है?",
        options: [
          { text: "Artificial Intelligence", correct: true },
          { text: "Automatic Internet", correct: false },
          { text: "Advanced Input", correct: false },
          { text: "Audio Interface", correct: false },
        ],
      },
      {
        question: "Which is a subset of AI?",
        questionHi: "AI का उपसमुच्चय कौन सा है?",
        options: [
          { text: "Machine Learning", correct: true },
          { text: "Web Development", correct: false },
          { text: "Networking", correct: false },
          { text: "Database", correct: false },
        ],
      },
      {
        question: "Siri and Alexa are examples of?",
        questionHi: "Siri और Alexa किसके उदाहरण हैं?",
        options: [
          { text: "AI Assistants", correct: true },
          { text: "Operating Systems", correct: false },
          { text: "Hardware", correct: false },
          { text: "Browsers", correct: false },
        ],
      },
      {
        question: "Can AI learn from data?",
        questionHi: "क्या AI डेटा से सीख सकता है?",
        options: [
          { text: "Yes", correct: true },
          { text: "No", correct: false },
        ],
      },
      {
        question: "What is the goal of AI?",
        questionHi: "AI का लक्ष्य क्या है?",
        options: [
          { text: "To simulate human intelligence", correct: true },
          { text: "To replace all humans", correct: false },
          { text: "To make computers slower", correct: false },
          { text: "To destroy the internet", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "data-science",
    category: "trending",
    title: "Data Science",
    titleHi: "डेटा विज्ञान",
    description: "Uncover insights from data to make better decisions.",
    descHi: "बेहतर निर्णय लेने के लिए डेटा से अंतर्दृष्टि उजागर करें।",
    videoId: "X3paOmcrTjQ",
    questions: [
      {
        question: "What is Data Science?",
        questionHi: "डेटा विज्ञान क्या है?",
        options: [
          { text: "Extracting knowledge from data", correct: true },
          { text: "Repairing computers", correct: false },
          { text: "Designing logos", correct: false },
          { text: "Writing stories", correct: false },
        ],
      },
      {
        question: "Which language is popular for Data Science?",
        questionHi: "डेटा विज्ञान के लिए कौन सी भाषा लोकप्रिय है?",
        options: [
          { text: "Python", correct: true },
          { text: "HTML", correct: false },
          { text: "CSS", correct: false },
          { text: "Photoshop", correct: false },
        ],
      },
      {
        question: "Data visualization helps in?",
        questionHi: "डेटा विज़ुअलाइज़ेशन किसमें मदद करता है?",
        options: [
          { text: "Understanding patterns", correct: true },
          { text: "Hiding data", correct: false },
          { text: "Deleting files", correct: false },
          { text: "Playing games", correct: false },
        ],
      },
      {
        question: "What is 'Big Data'?",
        questionHi: "'बिग डेटा' क्या है?",
        options: [
          { text: "Large and complex datasets", correct: true },
          { text: "A large font size", correct: false },
          { text: "A big computer", correct: false },
          { text: "Long video files", correct: false },
        ],
      },
      {
        question: "Who works with Data Science?",
        questionHi: "डेटा विज्ञान के साथ कौन काम करता है?",
        options: [
          { text: "Data Scientist", correct: true },
          { text: "Chef", correct: false },
          { text: "Pilot", correct: false },
          { text: "Plumber", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "deepfake",
    category: "trending",
    title: "Deepfake Awareness",
    titleHi: "डीपफेक जागरूकता",
    description: "Understand how AI creates fake media and how to spot it.",
    descHi: "समझें कि AI कैसे नकली मीडिया बनाता है और इसे कैसे पहचानें।",
    videoId: "gLoI9hAX9dw", // Placeholder
    questions: [
      {
        question: "What is a Deepfake?",
        questionHi: "डीपफेक क्या है?",
        options: [
          { text: "AI-generated fake video/audio", correct: true },
          { text: "A deep swimming pool", correct: false },
          { text: "A fake news article", correct: false },
          { text: "A virus", correct: false },
        ],
      },
      {
        question: "Deepfakes use which technology?",
        questionHi: "डीपफेक किस तकनीक का उपयोग करते हैं?",
        options: [
          { text: "Deep Learning (AI)", correct: true },
          { text: "Photoshop", correct: false },
          { text: "MS Paint", correct: false },
          { text: "Video Editor", correct: false },
        ],
      },
      {
        question: "Why can Deepfakes be dangerous?",
        questionHi: "डीपफेक खतरनाक क्यों हो सकते हैं?",
        options: [
          { text: "Spread misinformation", correct: true },
          { text: "Make movies cheaper", correct: false },
          { text: "Improve video quality", correct: false },
          { text: "They are not dangerous", correct: false },
        ],
      },
      {
        question: "How to spot a Deepfake?",
        questionHi: "डीपफेक को कैसे पहचानें?",
        options: [
          { text: "Look for unnatural blinking/lip-sync", correct: true },
          { text: "Check the file size", correct: false },
          { text: "Ask the sender", correct: false },
          { text: "You cannot spot it", correct: false },
        ],
      },
      {
        question: "Is creating harmful Deepfakes ethical?",
        questionHi: "क्या हानिकारक डीपफेक बनाना नैतिक है?",
        options: [
          { text: "No", correct: true },
          { text: "Yes", correct: false },
        ],
      },
    ],
    completed: false,
  },
  {
    id: "cybersecurity",
    category: "trending",
    title: "Cyber Safety",
    titleHi: "साइबर सुरक्षा",
    description: "Stay safe online — passwords, phishing, and privacy basics.",
    descHi: "ऑनलाइन सुरक्षित रहें — पासवर्ड, फ़िशिंग, और गोपनीयता।",
    videoId: "inWWhr5tnEA",
    questions: [
      {
        question: "Which is the safest password?",
        questionHi: "कौन सा सबसे सुरक्षित पासवर्ड है?",
        options: [
          { text: "Pr!ya$2025#Str0ng", correct: true },
          { text: "123456", correct: false },
          { text: "password", correct: false },
          { text: "priya123", correct: false },
        ],
      },
      {
        question: "What is Phishing?",
        questionHi: "फ़िशिंग क्या है?",
        options: [
          { text: "Fraudulent attempt to get sensitive info", correct: true },
          { text: "Fishing in a lake", correct: false },
          { text: "Updating software", correct: false },
          { text: "Installing a game", correct: false },
        ],
      },
      {
        question: "You should share your OTP with?",
        questionHi: "आपको अपना OTP किसके साथ साझा करना चाहिए?",
        options: [
          { text: "No one", correct: true },
          { text: "Bank Manager", correct: false },
          { text: "Friend", correct: false },
          { text: "Family", correct: false },
        ],
      },
      {
        question: "Two-Factor Authentication (2FA) adds?",
        questionHi: "टू-फैक्टर ऑथेंटिकेशन (2FA) क्या जोड़ता है?",
        options: [
          { text: "Extra layer of security", correct: true },
          { text: "More cost", correct: false },
          { text: "More time to login", correct: false },
          { text: "Viruses", correct: false },
        ],
      },
      {
        question: "What does a padlock icon in browser mean?",
        questionHi: "ब्राउज़र में पैडलॉक आइकन का क्या मतलब है?",
        options: [
          { text: "Connection is secure (HTTPS)", correct: true },
          { text: "Site is locked", correct: false },
          { text: "Internet is down", correct: false },
          { text: "Do not enter", correct: false },
        ],
      },
    ],
    completed: false,
  },
];
