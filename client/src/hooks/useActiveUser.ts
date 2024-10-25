import { useSocket } from "@/components/providers/SocketProvider";
import { useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore";

export const useActiveUser = () => {
    const { socket } = useSocket();
    const { user } = useAuthStore();
    const [activeUsers, setActiveUsers] = useState<Array<any>>([]);

    useEffect(() => {
        if (!socket || !user) {
            return;
        }

        socket.emit("userOnline", user.id);

        socket.on("activeUsers", (users: any) => {
            setActiveUsers(users);
        });

        return () => {
            socket.off("activeUsers");
        };
    }, [socket, user]);

    return {
        activeUsers,
    };
};
