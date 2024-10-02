import ListUser from "../users/ListUser"
import SearchUser from "../users/SearchUser"

const UserSidebar = () => {

  
  return (
    <div className="w-full lg:w-[30rem] bg-[#2e333d] px-3 overflow-hidden">
        <SearchUser/>
        <ListUser/>
    </div>
  )
}

export default UserSidebar