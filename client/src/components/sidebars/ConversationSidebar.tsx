import ListConversation from "../conversations/ListConversation"
import SearchConversation from "../conversations/SearchConversation"
import { useModalStore } from "@/hooks/useModalStore"
import { FaBars } from "react-icons/fa";
import { TbUsersPlus } from "react-icons/tb";


const ConversationSidebar = () => {
    const { onOpen } = useModalStore()
    return (
        <div className="w-full h-full lg:w-[30rem] bg-[#2e333d] px-3 overflow-hidden">
            <div className="flex items-center gap-2">
                <div className="max-md:block hidden pt-4">
                    <FaBars
                        size={25}
                        onClick={() => onOpen(true, 'SHEET_SIDEBAR')}
                        className="
                    text-white
                    cursor-pointer
                    
                    transition
                "
                    />

                </div>

                <SearchConversation />


                <button
                    className="mt-4 p-2 flex items-center justify-center rounded-full hover:bg-[#474747] transition"
                    onClick={() => onOpen(true, 'ADD_GROUP_MODAL')}
                >


                    <TbUsersPlus
                        size={25}
                        onClick={() => onOpen(true, 'ADD_GROUP_MODAL')}
                        className="
                        text-white
                        cursor-pointer
                      
                        transition
                        
                    "
                    />
                </button>




            </div>


            <ListConversation />
        </div>
    )
}

export default ConversationSidebar