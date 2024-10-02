import { useSocket } from "@/components/providers/SocketProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string;
    queryKey: string;
};

export const useChatSocket = ({
    addKey,
    queryKey,
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on(addKey, (message: any) => {
            console.log(`${addKey}: ${message.content}`);
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [
                            {
                                success: true,
                                messages: [message], 
                             
                            }
                        ],
                    };
                }

                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    messages: [message, ...newData[0].messages],
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        return () => {
            socket.off(addKey);
        };
    }, [queryClient, addKey, queryKey, socket]);
};
