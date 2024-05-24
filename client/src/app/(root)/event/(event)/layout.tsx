import RightBar from "@/components/shared/RightBar"
import SideBar from "@/components/shared/SideBar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100vh]">
      <main className="grid grid-cols-10 gap-6 h-full">
        <div className="col-span-2 border-r-2 border-gray-50 shadow-md px-6 py-8">
          <SideBar />
        </div>
        <div className="col-span-6 ">{children}</div>
        <div className="col-span-2 bg-gray-100 px-3 py-4">
          <RightBar />
        </div>
      </main>
    </div>
  )
}

export default Layout
