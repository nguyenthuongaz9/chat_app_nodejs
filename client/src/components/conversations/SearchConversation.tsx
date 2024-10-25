import {
    CommandDialog,
    CommandInput,
    CommandItem,
    CommandList,
    CommandGroup,
    CommandEmpty
} from "@/components/ui/command"
import { useAuthStore } from "@/hooks/useAuthStore"
import useConversationQuery from "@/hooks/useConversationQuery"
import useConversationScroll from "@/hooks/useConversationScroll"
import { Search } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchConversation = () => {
    const [open, setOpen] = useState(false)
    const { user } = useAuthStore()
    const queryKey = 'conversations'
    const conversationRef = useRef<ElementRef<"div">>(null)

    const navigate = useNavigate()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        fetchPreviousPage,
        isFetchingNextPage,
        hasPreviousPage,
        isFetchingPreviousPage,
    } = useConversationQuery({
        queryKey,
    });

    useConversationScroll({
        conversationRef,
        loadMoreBottom: fetchNextPage,
        loadMoreTop: fetchPreviousPage,
        shouldLoadMore: !isFetchingNextPage && !isFetchingPreviousPage && (!!hasNextPage || !!hasPreviousPage),
        isFetchingNextPage: isFetchingNextPage || isFetchingPreviousPage,
    });


    return (
        <div className="mt-5 w-full">
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full bg-zinc-700 hover:bg-zinc-600 transition"
            >
                <Search className="w-4 h-4 text-white dark:text-zinc-400" />
                <p
                    className="font-semibold text-sm text-white dark:text-zinc-400  transition"
                >
                    Search
                </p>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList ref={conversationRef}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {data?.pages.map((page, pageIndex) =>
                            page.conversations.map((conversation: any, userIndex: number) => {
                                const otherParticipants = conversation.participants.filter((participant: any) => participant._id !== user.id);
                                const otherUser = otherParticipants[0];

                                return (
                                    <CommandItem key={`${conversation._id}-${pageIndex}-${userIndex}`}>
                                        <div
                                            className="w-full flex gap-5 pl-5 md:py-3 py-2 rounded-md items-center cursor-pointer transition"
                                            onClick={() => navigate(`/conversations/${conversation._id}`)}
                                        >
                                            <img
                                                className="md:w-14 md:h-14 h-10 w-10 object-cover rounded-full"
                                                src={otherUser.imageUrl}
                                                alt="image user"
                                            />
                                            <div className="flex gap-2">
                                                <p className="text-black font-semibold md:text-lg text-md">
                                                    {otherUser.firstName}
                                                </p>
                                                <p className="text-black font-semibold md:text-lg text-md">
                                                    {otherUser.lastName}
                                                </p>
                                            </div>
                                        </div>

                                    </CommandItem>
                                );
                            })
                        )}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

export default SearchConversation
