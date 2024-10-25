import ConversationEmpty from "@/components/ConversationEmpty"
import { useActiveUser } from "@/hooks/useActiveUser"



const UserPage = () => {

  const { activeUsers } = useActiveUser()
  console.log(activeUsers)
  return (
    <div className="w-full h-full hidden lg:block">
      <ConversationEmpty />

    </div>


  )
}

export default UserPage