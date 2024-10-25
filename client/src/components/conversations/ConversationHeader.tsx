import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { HiEllipsisHorizontal } from "react-icons/hi2"
import { useAuthStore } from "@/hooks/useAuthStore";
import _ from 'lodash'
import { useModalStore } from "@/hooks/useModalStore";
import DEFAULT_GROUP_IMAGE from '../../../public/default_group_image.jpg' 



interface ConversationHeaderProps {
    conversation: any;
}


const ConversationHeader = ({
    conversation
}: ConversationHeaderProps) => {
    const { onOpen } = useModalStore()

    const { user } = useAuthStore()

    const participant = _.find(conversation.participants, (participant) => _.toString(participant._id) !== _.toString(user.id));


    return (
        <>

            <div
                className="
                bg-[#131313]
                w-full
                flex
                border-b-[1px]
                sm:px-4
                py-3
                px-4
                lg:px-6
                justify-between
                items-center
                shadow-sm
               
            "
            >
                <div className="flex gap-3 items-center">
                    <Link
                        className="
                        lg:hidden
                        block
                        text-sky-500
                        hover:text-sky-600
                        transition
                        cursor-pointer

                    "
                        to="/conversations"
                    >
                        <ChevronLeft
                            size={32}
                        />
                    </Link>
                    {conversation.isGroup ? (
                        <div className="flex items-center gap-2" >
                            <img className="h-10 w-10 rounded-full" src={DEFAULT_GROUP_IMAGE} alt="" />
                            <p className="text-white">
                                {conversation.title}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2" >
                            <img className="h-10 w-10 rounded-full" src={participant.imageUrl} alt="" />

                            <p className="text-white">

                                {participant.firstName} {participant.lastName}
                            </p>
                        </div>
                    )}




                </div>
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => onOpen(true, 'CONVERSATION_SIDEBAR')}
                    className="
                    text-white
                    cursor-pointer
                    
                    transition
                "
                />
            </div>

        </>
    )
}
export default ConversationHeader