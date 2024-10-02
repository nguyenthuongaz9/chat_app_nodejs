import { useEffect } from "react";




interface useConversationScrollProps{
    conversationRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMoreTop: ()=> void;
    loadMoreBottom: ()=> void;
    isFetchingNextPage: boolean;

}




const useConversationScroll = ({
    conversationRef,
    shouldLoadMore,
    loadMoreTop,
    loadMoreBottom,
    isFetchingNextPage,
}: useConversationScrollProps) => {
    
    useEffect(()=> {
        const topDiv = conversationRef?.current;

        const handleScroll =  () => {
            if(!topDiv || isFetchingNextPage) return;
            
            const scrollTop = topDiv.scrollTop;
            const scrollHeight = topDiv.scrollHeight;
            const clientHeight = topDiv.clientHeight;
    
            if(scrollTop === 0 && shouldLoadMore){
                loadMoreTop();
            }
    
            if((scrollTop + clientHeight) >= scrollHeight - 10 && shouldLoadMore){
                loadMoreBottom();
            }
        }
        topDiv?.addEventListener("scroll", handleScroll )
        return () => topDiv?.removeEventListener("scroll", handleScroll)

    }, [conversationRef, shouldLoadMore, loadMoreTop, loadMoreBottom, isFetchingNextPage])
 
}

export default useConversationScroll