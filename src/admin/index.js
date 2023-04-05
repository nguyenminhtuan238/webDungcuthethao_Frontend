import './css/admin.css'
import Headerad from './layout/header'
import Navadmin from './layout/nav'
const Admin=()=>{

    return (
        <div className="bodyadmin">
         <div className="container">
            <Headerad/>
            <div className="main">
            <Navadmin/>
        </div>
        </div>
    </div>
    );
}
export default Admin