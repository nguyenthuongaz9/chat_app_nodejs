import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useActiveUser } from "@/hooks/useActiveUser";
import { useModalStore } from "@/hooks/useModalStore";


interface UserAvatarProps {
    imageUrl: string;
    alt: string;
    userId: string;
}

export function UserAvatar({
    imageUrl,
    alt,
    userId
}: UserAvatarProps) {
    const { activeUsers } = useActiveUser()
    const isOnline = activeUsers.includes(userId);

    const { onOpen } = useModalStore()
    return (
        <div className="relative">
            <Avatar onClick={() => onOpen(true, "USER_MODAL")}>
                <AvatarImage src={imageUrl} alt={alt} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            {/* Chấm xanh nếu user online */}
            {isOnline && (
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
            )}
        </div>
    )
}
