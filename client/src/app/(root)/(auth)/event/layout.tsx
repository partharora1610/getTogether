import Navbar from "@/components/shared/Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AuthProvider>
    <>
      <Navbar />
      <main>{children}</main>
    </>
    // </AuthProvider>
  )
}

export default Layout
