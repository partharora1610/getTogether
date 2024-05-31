import GoogleLogin from "@/components/forms/AuthForm";
import React from "react";

const AuthPage = () => {
  return (
    <div className="min-w-screen min-h-screen relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          className="relative w-full h-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <GoogleLogin />
    </div>
  );
};

export default AuthPage;
