import { HOST } from "@/utils/constaints";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";




interface useConversationQueryProps {
    queryKey: string;
}



const useConversationQuery = ({
    queryKey
}: useConversationQueryProps) => {

    const fetchConversation = async ({pageParam = 1}) =>{
        const res = await axios.get(`${HOST}/api/conversations`, {
            params:{
                cursor: pageParam,
                limit: 10,
            },
            withCredentials: true
        })

        return res.data
    }


    const {
        data,
        fetchNextPage,
        hasNextPage,
        fetchPreviousPage,
        isFetchingPreviousPage,
        hasPreviousPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchConversation,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: 1,    
    })



    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        fetchPreviousPage,
        isFetchingPreviousPage,
        hasPreviousPage,
        status,
    }
}

export default useConversationQuery