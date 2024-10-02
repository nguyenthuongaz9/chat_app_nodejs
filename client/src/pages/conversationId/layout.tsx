import BottomBar from "@/components/sidebars/BottomBar"
import ConversationSidebar from "@/components/sidebars/ConversationSidebar"
import NavigationAction from "@/components/sidebars/NavigationAction"
import ConversationIdPage from "./page"




const ConversationIdLayout = () => {



  return (
    <div className="w-full h-screen flex gap-0 whitespace-normal relative">
      <NavigationAction />
     

      <div className="md:block md:h-full hidden h-full">
        <ConversationSidebar/>
      </div>

      <BottomBar/>
      <ConversationIdPage/>
    </div>
  )
}

export default ConversationIdLayout