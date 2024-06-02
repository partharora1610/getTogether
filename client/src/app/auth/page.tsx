"use client"
import GoogleLogin from "@/components/forms/AuthForm"
import React, { Suspense } from "react"

const AuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-w-screen min-h-screen relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            className="relative w-full h-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
        <GoogleLogin />
      </div>
    </Suspense>
  )
}

export default AuthPage
