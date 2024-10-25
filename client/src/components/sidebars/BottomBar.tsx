import useRoutes from "@/hooks/useRoutes"
import ActionTooltip from "../ActionTooltip"
import { useNavigate } from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { Logout } from "../Logout";





const BottomBar = () => {

    const routes = useRoutes()
    const navigate = useNavigate()
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#131313] h-[50px] space-y-5 z-50">
            <div className="w-full flex items-center justify-between h-full">
                {routes.map(route => (

                    <div
                        key={route.label}
                        onClick={() => {
                            console.log(`Navigating to ${route.href}`);
                            navigate(route.href);
                        }}
                        className={`w-full h-full flex items-center justify-center cursor-pointer border-r hover:bg-[#333333] transition ${route.active ? 'bg-[#333333]' : ''}`}
                    >
                        <ActionTooltip
                            label={route.label}
                        >
                            <route.icon size={25} className="text-white" />
                        </ActionTooltip>
                    </div>
                ))}

                <Logout
                    className={`p-[10px] w-full h-full flex items-center justify-center cursor-pointer hover:bg-[#333333] transition`}
                >
                    <ActionTooltip
                        label={"Logout"}
                    >
                        <FiLogOut size={25} className="text-white" />

                    </ActionTooltip>
                </Logout>




            </div>

        </div>
    )
}

export default BottomBar