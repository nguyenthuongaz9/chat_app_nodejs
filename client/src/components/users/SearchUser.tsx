import {
    CommandDialog,
    CommandInput,
    CommandItem,
    CommandList,
    CommandGroup,
    CommandEmpty
} from "@/components/ui/command"
import useUserQuery from "@/hooks/useUserQuery"
import useUserScroll from "@/hooks/useUserScroll"
import { HOST } from "@/utils/constaints"
import axios from "axios"
import { Search } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchUser = () => {
    const [open, setOpen] = useState(false)
    const queryKey = 'users'
    const userRef = useRef<ElementRef<"div">>(null);

    const navigate = useNavigate()

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

    const onClick = async (id: string) => {
        console.log(`Opening conversation with user ${id}`)
        try {
            const formData = new FormData();
            const isGroup = false;
            if (isGroup) {
                formData.append('otherUsers', JSON.stringify([`${id}`]));
            } else {
                formData.append('otherUsers', id);
            }
            formData.append('isGroup', isGroup.toString());

            formData.forEach((value, key) => {
                console.log(key, value);
            });

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
        <div className="mt-5">
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
                <CommandList ref={userRef}>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        {data?.pages.map((page, pageIndex) =>
                            page.users.map((user: any, userIndex: number) => (
                                <CommandItem
                                    key={`${user.id}-${pageIndex}-${userIndex}`}
                                    onSelect={() => onClick(user._id)}
                                >
                                    <div className="w-full flex gap-5 pl-5 md:py-3 py-2 rounded-md items-center cursor-pointer">
                                        <img
                                            className="md:w-10 md:h-10 h-10 w-10 object-cover rounded-full"
                                            src={user.imageUrl}
                                            alt="image user"
                                        />
                                        <div className="flex gap-2">
                                            <p className="text-black font-semibold md:text-lg text-md">
                                                {user.firstName}
                                            </p>
                                            <p className="text-black font-semibold md:text-lg text-md">
                                                {user.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))
                        )}

                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}

export default SearchUser
