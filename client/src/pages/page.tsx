import ConversationEmpty from "@/components/ConversationEmpty"
import { useActiveUser } from "@/hooks/useActiveUser"



const Home = () => {



  const { activeUsers } = useActiveUser()

  return (
    <div className="w-full h-full hidden lg:block">
      <ConversationEmpty />
    </div>
  )
}

export default Home