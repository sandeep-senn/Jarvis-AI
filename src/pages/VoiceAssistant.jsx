import React, { useEffect, useRef, useState } from "react";

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  const recognitionRef = useRef(null);
  const contentRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      // Try to find an English voice
      const englishVoice = allVoices.find(voice => voice.lang.includes('en'));
      setSelectedVoice(englishVoice || allVoices[0]);
    };

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = (text) => {
    if (!text || !selectedVoice) return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = 1;
    utterance.rate = 0.9;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
    
    // Add to conversation history
    setConversationHistory(prev => [...prev, { type: 'assistant', text }]);
  };

  const wishMe = () => {
    const hours = new Date().getHours();
    let greeting = "";
    if (hours < 12) greeting = "Good Morning! How can I help you today?";
    else if (hours <= 16) greeting = "Good Afternoon! How can I assist you?";
    else if (hours <= 19) greeting = "Good Evening! What can I do for you?";
    else greeting = "Good Night! How may I help you?";
    
    speak(greeting);
  };

  const takeCommand = (msg) => {
    const message = msg.toLowerCase().trim();
    setLastCommand(message);
    
    // Add user command to conversation history
    setConversationHistory(prev => [...prev, { type: 'user', text: msg }]);

    if (message.includes("hello") || message.includes("hi")) {
      speak("Hello! How can I assist you today?");
    } 
    else if (message.includes("who are you") || message.includes("what are you")) {
      speak("I am your voice assistant. I can help you with various tasks like searching the web, opening websites, telling time, and much more!");
    } 
    else if (message.includes("search")) {
      const query = message.replace("search", "").replace("for", "").trim();
      if (query) {
        speak(`Searching Google for ${query}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      } else {
        speak("What would you like me to search for?");
      }
    } 
    else if (message.includes("play")) {
      const query = message.replace("play", "").trim();
      if (query) {
        speak(`Playing ${query} on YouTube`);
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
      } else {
        speak("What would you like me to play?");
      }
    } 
    else if (message.includes("open")) {
      const words = message.split(" ");
      const openIndex = words.indexOf("open");
      const query = words.slice(openIndex + 1).join(" ").trim();

      const predefinedApps = {
        youtube: "https://www.youtube.com",
        google: "https://www.google.com",
        instagram: "https://www.instagram.com",
        twitter: "https://www.twitter.com",
        github: "https://www.github.com",
        facebook: "https://www.facebook.com",
        linkedin: "https://www.linkedin.com",
        whatsapp: "https://web.whatsapp.com",
        netflix: "https://www.netflix.com",
        gmail: "https://mail.google.com",
        maps: "https://maps.google.com"
      };

      if (predefinedApps[query]) {
        speak(`Opening ${query}`);
        window.open(predefinedApps[query], "_blank");
      } else if (query) {
        speak(`Opening ${query}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      } else {
        speak("What would you like me to open?");
      }
    }
    else if (message.includes("weather")) {
      speak("Getting current weather information");
      window.open("https://www.google.com/search?q=current+weather", "_blank");
    }
    else if (message.includes("news")) {
      speak("Opening latest news");
      window.open("https://news.google.com", "_blank");
    }
    else if (message.includes("time")) {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
      speak(`The current time is ${timeString}`);
    } 
    else if (message.includes("date")) {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      speak(`Today is ${dateString}`);
    } 
    else if (message.includes("help") || message.includes("commands")) {
      speak("I can help you with many things! You can say: open YouTube, search for something, play music, tell me the time or date, get weather information, open news, or just have a conversation with me!");
    }
    else if (message.includes("stop") || message.includes("quit") || message.includes("exit")) {
      speak("Goodbye! It was nice talking with you.");
      setIsActive(false);
      setListening(false);
    }
    else if (message.includes("thank you") || message.includes("thanks")) {
      speak("You're welcome! Is there anything else I can help you with?");
    }
    else if (message.includes("joke")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? He was outstanding in his field!",
        "Why don't eggs tell jokes? They'd crack each other up!",
        "What do you call a fake noodle? An impasta!",
        "Why did the coffee file a police report? It got mugged!"
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      speak(randomJoke);
    }
    else if(message.include("baat")){
      // General conversation response
      const responses = [
        "That's interesting! Can you tell me more?",
        "I understand. How can I help you with that?",
        "I'm here to assist you. What would you like to do?",
        "I'm not sure about that, but I can help you search for information if you'd like.",
        "That sounds important. Would you like me to search for more information about it?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      speak(randomResponse);
    }else {
  const badWords = ["madarchod", "behenchod", "chutiya", "gandu", "fuck", "shit", "bitch"];
  if (badWords.some((word) => message.includes(word))) {
    speak("Bhai, itni bakwaas mt kar warna teri saali ka bhowsda khol duuunga!");
  }
  };
};

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Setup speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
      // Restart recognition if still active
      if (isActive) {
        setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.log("Recognition restart error:", error);
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const result = event.results[event.resultIndex][0].transcript;
      setTranscript(result);
      if (contentRef.current) {
        contentRef.current.innerText = result;
      }
      takeCommand(result);
    };

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isActive]);

  const toggleAssistant = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isActive) {
      // Stop the assistant
      setIsActive(false);
      setListening(false);
      recognition.stop();
      speak("Jarvis deactivated. Goodbye!");
    } else {
      // Start the assistant
      setIsActive(true);
      try {
        recognition.start();
        speak("Jarvis activated!");
        setTimeout(() => {
          wishMe();
        }, 2000);
      } catch (error) {
        console.error("Failed to start recognition:", error);
        setIsActive(false);
      }
    }
  };

  const clearHistory = () => {
    setConversationHistory([]);
    setTranscript("");
    setLastCommand("");
    if (contentRef.current) {
      contentRef.current.innerText = "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎙️ Voice Assistant
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Panel - Suggestions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              💡 Try These Commands
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="p-2 bg-blue-50 rounded">• "Hello" - Greet the assistant</div>
              <div className="p-2 bg-green-50 rounded">• "What time is it?" - Get current time</div>
              <div className="p-2 bg-yellow-50 rounded">• "Search for cats" - Search Google</div>
              <div className="p-2 bg-purple-50 rounded">• "Play music" - Open YouTube</div>
              <div className="p-2 bg-pink-50 rounded">• "Open Gmail" - Open websites</div>
              <div className="p-2 bg-indigo-50 rounded">• "Tell me a joke" - Get a joke</div>
              <div className="p-2 bg-orange-50 rounded">• "What's the weather?" - Check weather</div>
              <div className="p-2 bg-red-50 rounded">• "Stop" - Deactivate assistant</div>
            </div>
          </div>

          {/* Center Panel - Main Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">Select Voice:</label>
                <select
                  value={selectedVoice?.name || ""}
                  onChange={(e) =>
                    setSelectedVoice(voices.find((voice) => voice.name === e.target.value))
                  }
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voices.map((voice, idx) => (
                    <option key={idx} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={toggleAssistant}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
                  isActive
                    ? "bg-red-500 hover:bg-red-600 shadow-lg transform hover:scale-105"
                    : "bg-blue-500 hover:bg-blue-600 shadow-lg transform hover:scale-105"
                }`}
              >
                {isActive ? "🛑 Stop Assistant" : "🎤 Start Assistant"}
              </button>

              <div className="mt-4 flex justify-center items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-600">
                  {isActive ? (listening ? "Listening..." : "Active") : "Inactive"}
                </span>
                <div className={`w-3 h-3 rounded-full ${listening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg min-h-[120px] border">
              <p className="text-sm text-gray-500 mb-2">Current Command:</p>
              <p ref={contentRef} className="font-medium text-gray-900 break-words">
                {transcript || "Say something..."}
              </p>
              {lastCommand && (
                <div className="mt-2 pt-2 border-t">
                  <p className="text-xs text-gray-500">Last: "{lastCommand}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Status & Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              📊 Status & Controls
            </h2>
            
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-semibold text-gray-800">
                  {isActive ? "🟢 Active" : "🔴 Inactive"}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Listening</div>
                <div className="font-semibold text-gray-800">
                  {listening ? "🎤 Yes" : "🔇 No"}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Commands Processed</div>
                <div className="font-semibold text-gray-800">
                  {conversationHistory.filter(h => h.type === 'user').length}
                </div>
              </div>

              <button
                onClick={clearHistory}
                className="w-full py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              💬 Conversation History
            </h2>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {conversationHistory.slice(-10).map((entry, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg ${
                    entry.type === 'user' 
                      ? 'bg-blue-50 border-l-4 border-blue-500 ml-4' 
                      : 'bg-green-50 border-l-4 border-green-500 mr-4'
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">
                    {entry.type === 'user' ? '👤 You' : '🤖 Assistant'}
                  </div>
                  <div className="text-sm text-gray-800">{entry.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;