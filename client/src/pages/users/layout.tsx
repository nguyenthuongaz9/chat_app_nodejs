import BottomBar from "@/components/sidebars/BottomBar"
import NavigationAction from "@/components/sidebars/NavigationAction"
import UserPage from "./page"
import UserSidebar from "@/components/sidebars/UserSidebar"


const UserLayout = () => {
  return (
    <div className="w-full h-screen flex gap-0 whitespace-normal relative">
      <NavigationAction />
      <BottomBar/>
      <UserSidebar/>
      <UserPage />
    </div>
  )
}

export default UserLayout