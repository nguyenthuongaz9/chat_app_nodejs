import AddGroupModal from "../modals/AddGroupModal"
import { UploadFileModal } from "../modals/UploadFileModal"

import { UserModal } from "../modals/UserModal"
// import { ConversationSheet } from "../conversations/ConversationSheet"
import { SheetSidebar } from "../sidebars/SheetSidebar"
const ModelProvider = () => {
  return (
    <div>
      <UserModal />
      {/* <ConversationSheet/> */}
      <SheetSidebar />
      <UploadFileModal/>
      <AddGroupModal />
    </div>
  )
}

export default ModelProvider