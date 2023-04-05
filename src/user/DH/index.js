import Login from '../login'
import {Uselogin} from '../uselogin'
import MainBill from './main'
import Header from '../layout/header'
import Footer from '../layout/footer'
import { useParams } from 'react-router'
import XuserDH from './XDH'

const Bill=()=>{
    const use=useParams();
    return(
        <Uselogin>
        <div className="bodylad">
            <Header />
            <div>
            {use.id? <XuserDH value={use.id} />: <MainBill/>}
          
            <Login />  
                             
            </div>
        </div>
        <Footer/> 
        </Uselogin>  
    )
}
export default Bill