import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState("");
  const recognitionRef = useRef(null);
  const contentRef = useRef(null);
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      console.log("Available voices:", allVoices);
    };

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }, []);

  const speak = () => {
    if (!text || !selectedVoice) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };
  // // Speak function
  // const speak = (text) => {
  //   console.log("Speaking:", text);
  //   const text_speak = new SpeechSynthesisUtterance(text);
  //   text_speak.pitch = 1;
  //   text_speak.rate = 1;
  //   text_speak.volume = 1;
  //   window.speechSynthesis.speak(text_speak);
  // };

  const wishMe = () => {
    const hours = new Date().getHours();
    console.log("wishme called at hour:", hours);
    if (hours < 12) speak("Subah ki raam raam Sir");
    else if (hours <= 16) speak("Good Afternoon Sir");
    else if (hours <= 19) speak("Good Evening Sir");
    else speak("Itni raat ko kese yaad kiya Sir");
  };

  const takeCommand = (msg) => {
    const message = msg.toLowerCase();
    console.log("takeCommand called with message:", message);

    if (message.includes("hello")) {
      speak("Hello Sir, How can I assist you today?");
    } else if (message.includes("who are you")) {
      speak("I am your virtual assistant made by Sandeep Sir.");
    } else if (message.includes("search")) {
      const query = message.replace("search", "").trim();
      speak(`Searching Google for ${query}`);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else if (message.includes("play")) {
      const query = message.replace("play", "").trim();
      speak(`Playing ${query} on YouTube`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
    } else if (message.includes("open")) {
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
      };

      if (predefinedApps[query]) {
        speak(`Opening ${query}`);
        window.open(predefinedApps[query], "_blank");
      } else if (message.includes("weather")) {
        speak("Fetching current weather from Google");
        window.open("https://www.google.com/search?q=current+weather", "_blank");
      } else if (query.match(/\.\w{2,}(\.\w{2,})?$/)) {
        speak(`Opening ${query}`);
        window.open(`https://${query}`, "_blank");
      } else if (query) {
        const dynamicUrl = `https://${query.replace(/\s+/g, "")}.com`;
        speak(`Opening ${query}`);
        window.open(dynamicUrl, "_blank");
      } else {
        const finalText = `This is what I found on internet regarding ${message}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
      }
    } else if (message.includes("time")) {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const timeString = `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
      speak("The time is " + timeString);
    } else if (message.includes("date")) {
      const dateString = new Date().toDateString();
      speak("The date is " + dateString);
    } else if (message.includes("help") || message.includes("commands")) {
      speak("You can say: open YouTube, what is the time, what is the date, or say hello.");
    } else {
      const badWords = ["madarchod", "behenchod", "chutiya", "gandu", "fuck", "shit", "bitch"];
      if (badWords.some((word) => message.includes(word))) {
        speak("Bhai, itni bakwaas mt kar warna teri saali ka bhowsda khol duuunga!");
      } else {
        speak("Sorry, I didn't understand that command.");
      }
    }
  };

  useEffect(() => {
    // Setup speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log("Recognition started");
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Recognition ended");
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
    };

    recognition.onresult = (event) => {
      const result = event.results[event.resultIndex][0].transcript;
      setTranscript(result);
      contentRef.current.innerText = result;
      takeCommand(result);
    };

    wishMe();
  }, []);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };


return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row items-center justify-center gap-10 p-6">
      
      {/* Left Box - Suggestions */}
      <motion.div
        className="w-full md:w-1/4 bg-white rounded-xl shadow-lg p-6 text-gray-800 font-sans"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">💡 Suggestions</h2>
                <p className="text-gray-700 mb-4">
          Here you can add extra features or tips for your assistant.
          Maybe some quick commands or info about the app.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Try asking about today's weather</li>
          <li>Set a reminder or alarm</li>
          <li>Ask for latest news headlines</li>
          <li>Get a quick math calculation</li>
          <li>Play your favorite song</li>
        </ul>
      </motion.div>

      {/* Center Box - Voice Assistant */}
      <motion.div
        className="w-full md:w-1/3 bg-gray-100 rounded-xl shadow-lg p-8 font-sans text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl font-semibold flex items-center gap-4 mb-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎙️ Voice Assistant
        </motion.h1>

        <div>
          <label className="block mb-3 font-medium text-gray-700">Select Voice:</label>
          <motion.select
            value={selectedVoice?.name || ""}
            onChange={(e) =>
              setSelectedVoice(voices.find((voice) => voice.name === e.target.value))
            }
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition shadow-sm mb-6"
            whileFocus={{ scale: 1.03 }}
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </motion.select>
        </div>

        <motion.button
          onClick={toggleListening}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md
            ${listening ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"}
          `}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250 }}
          aria-pressed={listening}
          aria-label={listening ? "Stop listening" : "Start listening"}
        >
          {listening ? "🛑 Stop Listening" : "🎤 Start Listening"}
        </motion.button>

        <motion.div
          className="bg-white p-6 rounded-xl border border-gray-200 min-h-[100px] shadow-inner mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-500 mb-2">You said:</p>
          <p className="font-medium text-gray-900 break-words">{transcript || "..."}</p>
        </motion.div>
      </motion.div>

      {/* Right Box - Extras */}
      <motion.div
        className="w-full md:w-1/4 bg-white rounded-xl shadow-lg p-6 text-gray-800 font-sans"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">📌 Privacy Tips</h2>
        <p className="text-gray-700 mb-4">
          Here you can add extra features or tips for your assistant.
          Maybe some quick commands or info about the app.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Voice data is encrypted for security</li>
          <li>clear your voice history anytime.</li>
          <li>Turn off listening when not in use.</li>
          <li>Only enable permissions for voice features.</li>
          <li>Review and update your privacy settings regularly.</li>
        </ul>
      </motion.div>

    </div>

);


};


export default VoiceAssistant;
