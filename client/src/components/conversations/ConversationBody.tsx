import { ElementRef, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import useMessageQuery from "@/hooks/useMessageQuery";
import useMessageScroll from "@/hooks/useMessageScroll";
import { File, Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/hooks/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { format } from "date-fns";
import { useChatSocket } from "@/hooks/useChatSocket";

const ConversationBody = () => {
  const messageRef = useRef<ElementRef<"div">>(null);
  const { user } = useAuthStore();
  const { id } = useParams();
  const queryKey = 'messages';
  const addKey =`new_message_${id}`;
  const bottomRef = useRef<ElementRef<"div">>(null);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status
  } = useMessageQuery({
    queryKey: queryKey,
    conversationId: id as string
  });

  const totalMessagesCount = data?.pages.reduce((acc, page) => acc + page.messages.length, 0) || 0;
  useChatSocket({
    addKey,
    queryKey,
  });


  useMessageScroll({
    messageRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    bottomRef: bottomRef,
    count: totalMessagesCount,
  });




  if (status === 'pending') {
    return (
      <div className="flex-1 w-full md:h-[calc(100%_-_120px)] h-[calc(100%_-_170px)] flex items-center justify-center">
        <Loader2 className="animate-spin text-white" size={25} />
      </div>
    );
  }

  if (!data || data.pages.length === 0) {
    return <div className="text-white">No messages found</div>;
  }
  return (
    <div className="flex-1 md:h-[calc(100%_-_120px)] h-[calc(100%_-_170px)] flex flex-col py-4">
      <ScrollArea>
        <div ref={messageRef} className="flex-1 overflow-y-auto max-h-full">

          {hasNextPage && (
            <div className="flex justify-center">
              {isFetchingNextPage ? (
                <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                >
                  Load previous messages
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col mt-auto px-5">
            {data.pages.map((page, pageIndex) => (
              <div key={pageIndex} className="w-full p-2 space-y-4">
                {page.messages.slice().reverse().map((message: any, messageIndex: any) => {
                  const isCurrentUser = message.sender._id === user.id;
                  
                  return (
                    <div
                      key={message.id || `${pageIndex}-${messageIndex}`}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-xs ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="mb-4">
                          <AvatarImage src={message.sender.imageUrl} alt={'image'} />
                          <AvatarFallback>{message.sender.firstName} {message.sender.lastName}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center text-sm gap-1">
                            <span className="text-zinc-400">{message.sender.firstName} {message.sender.lastName}</span>
                            <span className="text-xs text-gray-500">{format(new Date(message.createdAt), 'p')}</span>
                          </div>
                          {message?.fileUrl ? (
                            <div className="mt-2">
                              {message.fileUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                <img
                                  src={message.fileUrl}
                                  alt="attached"
                                  className="max-w-full h-auto rounded-lg"
                                />
                              ) : (
                                <div className="flex items-center gap-2">
                                  <File className="h-6 w-6 text-gray-600" />
                                  <a
                                    href={message.fileUrl}
                                    download
                                    className="text-blue-500 hover:underline"
                                  >
                                    Tải xuống file
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className={`${isCurrentUser ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'} text-sm md:text-md rounded-lg p-2 mt-2`}>
                              {message.content}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

        </div>
      </ScrollArea>
    </div>
  );

};

export default ConversationBody;
