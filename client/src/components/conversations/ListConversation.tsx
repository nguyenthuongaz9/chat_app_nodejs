import { Loader2 } from "lucide-react";
import { ElementRef, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import useConversationQuery from "@/hooks/useConversationQuery";
import useConversationScroll from "@/hooks/useConversationScroll";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";

const ListConversation = () => {
  const queryKey = 'conversations';
  const conversationRef = useRef<ElementRef<"div">>(null);
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    isFetchingNextPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    status,
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

  if (status === 'pending') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-white text-xl">Error fetching users.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  

  return (
    <ScrollArea
      className="w-full h-full"
    >
      <div
        ref={conversationRef}
        className="mt-10 flex flex-col items-center gap-5 overflow-y-auto"
        style={{ height: `calc(100vh - 100px)` }}
      >
        {data.pages.map((page, pageIndex) =>
          page.conversations.map((conversation: any, userIndex: number) => {
            const otherParticipants = conversation.participants.filter((participant: any) => participant._id !== user.id);
            const otherUser = otherParticipants[0];

            return (
              <div
                key={`${conversation._id}-${pageIndex}-${userIndex}`}
                className="w-full flex gap-5 bg-zinc-700 pl-5 md:py-3 py-2 rounded-md items-center cursor-pointer hover:bg-zinc-600 transition"
                onClick={()=> navigate(`/conversations/${conversation._id}`)}
              >
                <img
                  className="md:w-14 md:h-14 h-10 w-10 object-cover rounded-full"
                  src={otherUser.imageUrl}
                  alt="image user"
                />
                <div className="flex gap-2">
                  <p className="text-white font-semibold md:text-lg text-md">
                    {otherUser.firstName}
                  </p>
                  <p className="text-white font-semibold md:text-lg text-md">
                    {otherUser.lastName}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </ScrollArea>
  );
};

export default ListConversation;
