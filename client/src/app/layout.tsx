import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "getTogether",
  description: "Made with love by BinodLab",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <GoogleOAuthProvider clientId="11657016262-9g9hveivd4ge7smk3k3up610c3fuilb2.apps.googleusercontent.com">
        <body
          className={cn("min-h-screen bg-background font-sans antialiased")}
        >
          {children}
        </body>
        <Toaster />
      </GoogleOAuthProvider>
    </html>
  )
}
