

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { EmojiPicker } from "../EmojiPicker";
import axios from "axios";
import { HOST } from "@/utils/constaints";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useModalStore } from "@/hooks/useModalStore";


const formSchema = z.object({
  content: z.string().min(1),
});

export const ConversationInput = () => {
  const { onOpen } = useModalStore()

  const { id } = useParams()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${HOST}/api/messages`, {
        message: values.content,
        conversationId: id,
      },{
        withCredentials: true
      })

      if(response.status === 201){
        form.reset();
        toast.success('Message sent successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to send message');
    }
  }

  

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => onOpen(true, 'UPLOAD_FILE', { conversationId: id})}
                    className="absolute top-3 left-4 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <input
                    disabled={isLoading}
                    className="w-full px-16 py-3 bg-[#131313] border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                    
                    {...field}
                  />
                  <div className="absolute top-3 right-4">
                    <EmojiPicker
                      onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}