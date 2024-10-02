
import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/hooks/useAuthStore"
import { useModalStore } from "@/hooks/useModalStore"
import { HOST } from "@/utils/constaints"
import axios from "axios"
import { Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


interface ConversationSheetProps{
    conversation: any;
}


export function ConversationSheet({
    conversation
}: ConversationSheetProps) {
    const { type, open, onClose } = useModalStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const isModalOpen = open && type === 'CONVERSATION_SIDEBAR';

    const ortherUser = conversation.participants.filter((participant:any) => participant._id !== user.id)[0]
    
    const onClick = async () => {
        try {
            
            const res = await axios.delete(`${HOST}/api/conversations/${conversation._id}`)
            if(res.status === 200){
                toast.success(`Conversation deleted successfully`)
                onClose()
                navigate('/conversations')
            }
        } catch (error) {
             toast.error(`Failed to delete conversation. Please try again later`)
            console.log(error)
        }
    }

    
    return (
        <Sheet open={isModalOpen} onOpenChange={onClose}>

            <SheetContent className="bg-[#131313] text-white space-y-5">
              
                <div className=" flex flex-col gap-4 items-center " >
                    <img className="h-20 w-20 rounded-full object-cover" src={ortherUser.imageUrl} alt="userImage" />     
                    <p className="text-white font-semibold">
                        {ortherUser.firstName} {ortherUser.lastName} 
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <Trash onClick={onClick} className="text-white hover:text-rose-500 transition cursor-pointer" size={25}/>
                </div>
               
            </SheetContent>
        </Sheet>
    )
}
