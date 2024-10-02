import { HOST } from "@/utils/constaints";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface useUserQueryProps {
  queryKey?: string;
}

const useUserQuery = ({ queryKey }: useUserQueryProps) => {
  const fetchUsers = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${HOST}/api/users`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: 1,
  });



  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    status,

  };
};

export default useUserQuery;
