import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useModalStore } from "@/hooks/useModalStore";


interface UserAvatarProps{
    imageUrl: string;
    alt: string; 
}

export function UserAvatar({
    imageUrl,
    alt
}: UserAvatarProps) {

    const { onOpen } = useModalStore()
    return (
        <Avatar onClick={()=> onOpen(true, "USER_MODAL")}>
            <AvatarImage src={imageUrl} alt={alt} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
