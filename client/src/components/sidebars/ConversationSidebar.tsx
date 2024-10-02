import ListConversation from "../conversations/ListConversation"
import SearchConversation from "../conversations/SearchConversation"


const ConversationSidebar = () => {
    return (
        <div className="w-full h-full lg:w-[30rem] bg-[#2e333d] px-3 overflow-hidden">
            <SearchConversation />

            <ListConversation />
        </div>
    )
}

export default ConversationSidebar