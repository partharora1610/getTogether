import AuthProvider from "@/components/Provider/AuthProvider"
import Navbar from "@/components/shared/Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="h-[100vh]">
        <div>
          <Navbar />
        </div>
        <main>{children}</main>
      </div>
    </AuthProvider>
  )
}

export default Layout
