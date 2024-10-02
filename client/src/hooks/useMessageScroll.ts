


type ChatScrollProps = {
    messageRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: ()=> void;
    count: number
}


import React, { useEffect, useState } from 'react'

const useChatScroll = ({
    messageRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count
}: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false)


    useEffect(()=> {
        const topDiv = messageRef?.current;
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            if(scrollTop === 0 && shouldLoadMore){
                loadMore();
            }
        }

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll);
        }
    }, [shouldLoadMore, loadMore, messageRef, hasInitialized, count])

    useEffect(()=> {
        const bottomDiv = bottomRef?.current;
        const topDiv = messageRef?.current
        const shouldAutoScroll = ()=> {
            if(!hasInitialized && bottomDiv){
                setHasInitialized(true);
                return true;
            }

            if(!topDiv){
                return false
            }


            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
            return distanceFromBottom <= 100
        }

        if(shouldAutoScroll()){
            setTimeout(()=>{
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                })
            },100)
        }
    })

 
}

export default useChatScroll