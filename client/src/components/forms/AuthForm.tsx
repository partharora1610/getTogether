"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useGoogleLogin } from "@react-oauth/google"
import { useRouter, useSearchParams } from "next/navigation"
import authStore from "@/store/auth-store"

export default function AuthForm() {
  const { login } = authStore()
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl")

  const router = useRouter()

  const loginClickHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success:", tokenResponse.access_token)
      const flag = await login({ token: tokenResponse.access_token })

      if (flag) {
        if (callbackUrl) {
          router.push(callbackUrl)
        } else {
          router.push("/event/create")
        }
      } else {
        router.push("/auth")
      }
    },

    onError: (err) => {
      console.log("Google login error:", err)
    },
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="bg-gray-900 text-white flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="max-w-md space-y-4">
          <div className="flex items-center space-x-2">
            <div>
              <MountainIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">getTogether</h1>
              <div>
                <p className="mt-2">by binoddev</p>
              </div>
            </div>
          </div>
          <p className="text-gray-400">Manage your events at one place</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold">Sign in</h2>
          <form className="space-y-4">
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button
              className="w-full"
              variant="outline"
              onClick={async (e) => {
                e.preventDefault()
                loginClickHandler()
              }}
            >
              <ChromeIcon className="mr-2 h-4 wc-4" />
              Sign in with Google
            </Button>
            <div className="text-right">
              <Link className="text-sm text-gray-500 hover:underline" href="#">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

// const { login } = authStore()
// const url =
//   "https://accounts.google.com/o/oauth2/v2/auth?client_id=403568051053-ue6i1784hhl08q4ujgtf6c5u2ov4n7t7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/callback/google&response_type=code&scope=email%20profile&access_type=offline&prompt=consent"
