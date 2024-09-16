import BottomBar from "@/components/sidebars/BottomBar"
import NavigationAction from "@/components/sidebars/NavigationAction"
import UserPage from "./page"


const UserLayout = () => {
  return (
    <div className="w-full h-screen flex gap-0 whitespace-normal relative">
      <NavigationAction />
      <BottomBar/>
      <UserPage />
    </div>
  )
}

export default UserLayout