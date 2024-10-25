import useRoutes from "@/hooks/useRoutes"
import ActionTooltip from "../ActionTooltip"
import logo from '../../../public/logo.png'
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/hooks/useAuthStore"
import { UserAvatar } from "../UserAvatar"
import { IoLogOutOutline } from "react-icons/io5";
import { Logout } from "../Logout"





const NavigationAction = () => {

    const routes = useRoutes()
    const navigate = useNavigate()

    const { user } = useAuthStore()
    return (
        <div className="md:flex flex-col items-center hidden h-full bg-[#131313] w-[75px] space-y-5">
            <div className="flex flex-col gap-2 items-center justify-center mt-5">
                <img src={logo} alt="mylogo" className="w-[50px] h-[50px] object-cover rounded-md" />
            </div>


            <div className="flex flex-col items-center gap-2 h-full">
                {routes.map(route => (
                    <div key={route.label} className="flex flex-col items-center ">
                        <div
                            onClick={() => navigate(route.href)}
                        >
                            <ActionTooltip
                                label={route.label}
                                align="center"
                                side="right"
                                active={route.active}
                            >
                                <route.icon size={25} className="text-white" />
                            </ActionTooltip>
                        </div>
                    </div>
                ))}
            </div>

            {user && <div className="pb-4 cursor-pointer flex items-center flex-col ">

                <ActionTooltip
                    label={"Logout"}
                    align="center"
                    side="right"

                >
                    <Logout>
                        <IoLogOutOutline size={25} className="text-white" />
                    </Logout>

                </ActionTooltip>
                <ActionTooltip
                    label={user.firstName + " " + user.lastName}
                    align="center"
                    side="right"
                >

                    <UserAvatar userId={user.id} imageUrl={user.imageUrl} alt="username" />
                </ActionTooltip>

            </div>}


        </div>
    )
}

export default NavigationAction