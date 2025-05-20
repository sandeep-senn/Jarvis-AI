import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import DashboardPage from "./pages/DashboardPage.jsx";
import Home from "./pages/Home.jsx";
import Founder from "./components/Founder.jsx";
import { ToastContainer } from "react-toastify";
import { UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        <UserButton className="absolute top-4 right-4" />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
