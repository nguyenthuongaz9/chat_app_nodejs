import { useSocket } from "@/components/providers/SocketProvider";
import { HOST } from "@/utils/constaints";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";
import axios from "axios";

interface useMessageQueryProps{
    queryKey: string;
    conversationId: string;
}

const useMessageQuery = ({
    queryKey,
    conversationId,
}: useMessageQueryProps) => {
    const { isConnected } = useSocket()
    const fetchMessage = async ({ pageParam = 1 }) => {
        const url = qs.stringifyUrl({
            url: HOST + "/api/messages",
            query: {
                cursor: pageParam,
                limit: 10,
                conversationId: conversationId
            },
        }, { skipNull: true })
        const res = await axios.get(url, {
            withCredentials: true
        });
        return res.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessage,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: 1,
        refetchInterval: isConnected ? false : 1000
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    };
};

export default useMessageQuery;
