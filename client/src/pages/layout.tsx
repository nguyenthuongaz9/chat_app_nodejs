import NavigationAction from "@/components/sidebars/NavigationAction"
import Home from "./page"
import BottomBar from "@/components/sidebars/BottomBar"



const Rootlayout = () => {
  return (
    <div className="w-full h-screen flex gap-0 whitespace-normal relative">
      <NavigationAction />
      <BottomBar/>
      <Home />
    </div>
  )
}

export default Rootlayout