import Navbar from "@/components/shared/Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh]">
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout
