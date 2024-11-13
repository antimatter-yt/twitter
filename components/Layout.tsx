"use client"

import Followbar from "./layout/FollowBar"
import Sidebar from "./layout/Sidebar"
interface LayoutProps{
  children:React.ReactNode
}
const Layout:React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="h-screen bg-black">
        <div className="container mx-auto h-full xl:px-30 ">
            <div className="grid grid-cols-4 h-full">
                <Sidebar />
                <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                  {children}
                </div>
                <Followbar/>
            </div>
        </div>
    </div>
  )
}

export default Layout