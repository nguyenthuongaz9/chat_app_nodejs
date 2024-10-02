import ConversationBody from "@/components/conversations/ConversationBody";
import ConversationHeader from "@/components/conversations/ConversationHeader";
import { ConversationInput } from "@/components/conversations/ConversationInput";
import { ConversationSheet } from "@/components/conversations/ConversationSheet";
import { HOST } from "@/utils/constaints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"




const ConversationIdPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ['conversation', id],
    queryFn: async () => {
      const response = await axios.get(`${HOST}/api/conversations/${id}`, {
        withCredentials: true
      })
      return response.data
    }
  })

  if (isLoading) return <div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin" size={25} /></div>

  if (!data) {
    return navigate('/conversations');
  }
  if (error) return navigate('/conversations')



  return (
    <div className="w-full h-full lg:block overflow-hidden">
      <ConversationHeader conversation={data.conversation} />

      <ConversationBody />

      <ConversationInput />


      <div>
        <ConversationSheet conversation={data.conversation} />
      </div>

    </div>
  )
}

export default ConversationIdPage