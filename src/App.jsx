import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import DashboardPage from "./pages/VoiceAssistant.jsx";
import Home from "./pages/Home.jsx";
import Founder from "./components/Founder.jsx";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedIn>
                  <Home />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <DashboardPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route path="/founder" element={<Founder />} />
          <Route path="/navbar" element={<Navbar />} />

        </Routes>
      </div>
    </>
  );
}

export default App;