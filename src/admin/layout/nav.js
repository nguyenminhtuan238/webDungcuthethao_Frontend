import { memo } from 'react'
import Userimg from '../../img/user.png'

const Navadmin=()=>{
  return(
    <div className="top-bar">
    <div className="search">
        <input type="text" name="search" placeholder="Tìm kiếm tại đây" />
        <label htmlFor="search"><i className="fas fa-search"></i></label>
    </div>
    <i className="fas fa-bell"></i>
    <div className="user">
        <img src={Userimg} alt="" />
    </div>
</div>
  )

}
export default memo(Navadmin)