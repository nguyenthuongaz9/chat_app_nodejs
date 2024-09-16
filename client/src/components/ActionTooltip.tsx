

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";





interface ActionTooltipProps {
    label: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    active?: boolean;
}


const ActionTooltip = ({
    label,
    children,
    side,
    align,
    active
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={60} >
                <TooltipTrigger asChild>
                    <button type="button" className={`p-[10px] rounded-full cursor-pointer ${active ? 'bg-[#333333]' : ''}`}>
                        {children}
                    </button>
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="text-white">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltip