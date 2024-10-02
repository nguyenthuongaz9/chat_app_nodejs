import { useEffect } from "react";

interface useUserScrollProps {
  userRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMoreTop: () => void;
  loadMoreBottom: () => void;
  isFetchingNextPage: boolean;
}

const useUserScroll = ({
  userRef,
  shouldLoadMore,
  loadMoreTop,
  loadMoreBottom,
  isFetchingNextPage,
}: useUserScrollProps) => {
  useEffect(() => {
    const topDiv = userRef?.current;

    const handleScroll = () => {
      if (!topDiv || isFetchingNextPage) return;

      const scrollTop = topDiv.scrollTop;
      const scrollHeight = topDiv.scrollHeight;
      const clientHeight = topDiv.clientHeight;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMoreTop();
      }

      if (scrollTop + clientHeight >= scrollHeight - 10 && shouldLoadMore) {
        loadMoreBottom();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [shouldLoadMore, loadMoreTop, loadMoreBottom, userRef, isFetchingNextPage]);
};

export default useUserScroll;
