import useUserQuery from "@/hooks/useUserQuery";
import useUserScroll from "@/hooks/useUserScroll";
import { Loader2 } from "lucide-react";
import { ElementRef, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "@/utils/constaints";

const ListUser = () => {
  const queryKey = 'users';
  const userRef = useRef<ElementRef<"div">>(null);
  const navigate = useNavigate();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage, 
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage, 
  } = useUserQuery({
    queryKey,
  });

  useUserScroll({
    userRef,
    loadMoreTop: fetchPreviousPage, 
    loadMoreBottom: fetchNextPage,
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
        <p className="text-white text-xl">Error fetching users.</p>;
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

  const onClick = async (id: string) => {
    try {
      const formData = new FormData();
      const isGroup = false;
      if (isGroup) {
        formData.append('otherUsers', JSON.stringify([`${id}`]));
      } else {
        formData.append('otherUsers', id);
      }
      formData.append('isGroup', isGroup.toString());

      const response = await axios.post(`${HOST}/api/conversations`, formData, {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      });

      if (response.status === 200 || response.status === 201) {
        navigate(`/conversations/${response.data.conversation._id}`);
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollArea>
      <div
        ref={userRef}
        className="mt-10 flex flex-col items-center gap-5"
        style={{ height: `calc(100vh - 100px)` }}
      >
        {data.pages.map((page, pageIndex) =>
          page.users.map((user: any, userIndex: number) => (
            <div
              key={`${user.id}-${pageIndex}-${userIndex}`}
              onClick={() => onClick(user._id)}
              className="w-full flex gap-5 bg-zinc-700 pl-5 md:py-3 py-2 rounded-md items-center cursor-pointer hover:bg-zinc-600 transition"
            >
              <img
                className="md:w-14 md:h-14 h-10 w-10 object-cover rounded-full"
                src={user.imageUrl}
                alt="image user"
              />
              <div className="flex gap-2">
                <p className="text-white font-semibold md:text-lg text-md">
                  {user.firstName}
                </p>
                <p className="text-white font-semibold md:text-lg text-md">
                  {user.lastName}
                </p>
              </div>
            </div>
          ))
        )}

        {isFetchingPreviousPage && <div>Loading previous users...</div>}
        {isFetchingNextPage && <div>Loading more users...</div>}
      </div>
    </ScrollArea>
  );
};

export default ListUser;
