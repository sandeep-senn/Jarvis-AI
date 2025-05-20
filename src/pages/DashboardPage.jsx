import React, { useState } from "react";
import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import micAnimation from "../assets/lottie.json"; // <- Replace with your path

const DashboardPage = () => {
  const [userSpeech, setUserSpeech] = useState("");
  const [jarvisResponse, setJarvisResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleCommand = async (cmd) => {
    setUserSpeech(cmd);
    speak("You said: " + cmd);

    const msg = cmd.toLowerCase();

    if (msg.includes("open youtube")) {
      speak("Opening YouTube");
      setJarvisResponse("Opening YouTube...");
      window.open("https://www.youtube.com", "_blank");
      return;
    }

    if (msg.includes("time")) {
      const time = new Date().toLocaleTimeString();
      speak("Current time is " + time);
      setJarvisResponse("Current time is " + time);
      return;
    }

    // Fallback to ChatGPT
    try {
      setJarvisResponse("Thinking...");
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace this
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: cmd }],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I didn't get that.";
      setJarvisResponse(reply);
      speak(reply);
    } catch (err) {
      console.error(err);
      setJarvisResponse("Failed to connect to ChatGPT.");
      speak("Failed to connect to ChatGPT.");
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleCommand(transcript);
    };

    recognition.start();
    speak("Listening started.");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#141e30] to-[#243b55] flex flex-col items-center justify-center px-4 text-white">
      <motion.h1 className="text-4xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Welcome to <span className="text-blue-500">Jarvis</span>
      </motion.h1>

      {isListening && (
        <motion.div
          className="w-44 h-44 mb-6"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lottie animationData={micAnimation} loop autoplay />
        </motion.div>
      )}

      <div className="bg-white bg-opacity-10 p-6 rounded-2xl max-w-xl w-full text-center shadow-xl space-y-4">
        {userSpeech && (
          <motion.p
            className="text-xl text-yellow-300 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            👤 You: "{userSpeech}"
          </motion.p>
        )}

        {jarvisResponse && (
          <motion.p
            className="text-lg text-green-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            🤖 Jarvis: {jarvisResponse}
          </motion.p>
        )}

        <button
          onClick={startListening}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors py-3 px-6 rounded-xl font-medium"
        >
          <Mic size={20} /> Start Talking
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
