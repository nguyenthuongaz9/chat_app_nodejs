import { useMemo } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";




const useRoutes = () => {
    const location = useLocation()

    const routes = useMemo(()=> [
        {
            label: 'Chat',
            href: '/conversations',
            icon:IoChatbubblesSharp,
            active: location.pathname === '/conversations'
        },
        {
            label: 'Users',
            href: '/users',
            icon:FaUserFriends,
            active: location.pathname === '/users'
        },
    ],[location.pathname])

    return routes;
    
}

export default useRoutes