import AuthProvider from "@/components/Provider/AuthProvider"
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  )
}

export default Layout
