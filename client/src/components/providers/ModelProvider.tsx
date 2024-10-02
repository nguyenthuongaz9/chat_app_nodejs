import { UserModal } from "../modals/UserModal"
// import { ConversationSheet } from "../conversations/ConversationSheet"
import { SheetSidebar } from "../sidebars/SheetSidebar"
const ModelProvider = () => {
  return (
    <div>
      <UserModal/>
      {/* <ConversationSheet/> */}
      <SheetSidebar/>
    </div>
  )
}

export default ModelProvider