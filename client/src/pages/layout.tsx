import NavigationAction from "@/components/sidebars/NavigationAction"
import Home from "./page"
import BottomBar from "@/components/sidebars/BottomBar"
import ConversationSidebar from "@/components/sidebars/ConversationSidebar"


const Rootlayout = () => {


  return (
    <div className="w-full h-screen flex gap-0 whitespace-normal relative">
      <NavigationAction />
      <ConversationSidebar/>
      <BottomBar/>
      <Home />
    </div>
  )
}

export default Rootlayout