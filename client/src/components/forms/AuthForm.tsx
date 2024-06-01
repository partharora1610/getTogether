"use client"

import { OverridableTokenClientConfig, useGoogleLogin } from "@react-oauth/google"
import { useRouter, useSearchParams } from "next/navigation"
import authStore from "@/store/auth-store"

type LoginClickHandler = (overrideConfig?: OverridableTokenClientConfig) => void;

export default function GoogleLogin() {
  const { login } = authStore()
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl")

  const router = useRouter()

  const loginClickHandler: LoginClickHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success:", tokenResponse.access_token)
      const flag = await login({ token: tokenResponse.access_token })

      if (flag) {
        if (callbackUrl) {
          router.push(callbackUrl)
        } else {
          router.push("/event/onboarding")
        }
      } else {
        router.push("/auth")
      }
    },

    onError: (err) => {
      console.log("Google login error:", err)
    },
  });

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <GoogleLoginButton loginClickHandler={loginClickHandler} />
    </div>
  );

}

const GoogleLoginButton = ({ loginClickHandler }: { loginClickHandler: LoginClickHandler }) => {
  return (
    <button 
    onClick={() => loginClickHandler()}
    className="flex items-center px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-white/60 transition-colors duration-300">
      <svg
        className="w-10 h-8 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="currentColor"
      >
        <path d="M24 9.5c3.66 0 6.26 1.57 7.7 2.9l5.65-5.66C33.3 3.26 29 1.5 24 1.5 14.87 1.5 7.23 7.77 5.09 16.31l6.92 5.32C13.68 15.23 18.4 9.5 24 9.5z" fill="#EA4335" />
        <path d="M46.5 24.5c0-1.44-.12-2.81-.34-4.16H24v7.91h12.7c-.56 3.1-2.17 5.73-4.58 7.5l7.14 5.52c4.17-3.85 6.54-9.52 6.54-16.77z" fill="#4285F4" />
        <path d="M11.01 28.22c-1.25-.7-2.34-1.64-3.21-2.71l-6.92 5.32c1.97 3.92 5.21 6.91 9.14 8.61l7.14-5.52c-2.36-.7-4.4-1.88-6.15-3.39z" fill="#FBBC05" />
        <path d="M24 46.5c5.4 0 10-1.75 13.36-4.74l-7.14-5.52c-2.03 1.36-4.6 2.2-7.25 2.2-5.68 0-10.5-3.7-12.25-8.74l-6.92 5.32C7.23 40.23 14.87 46.5 24 46.5z" fill="#34A853" />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};
