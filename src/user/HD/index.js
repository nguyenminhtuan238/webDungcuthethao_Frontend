import Login from '../login'
import {Uselogin} from '../uselogin'
import MainHD from './main'
import Header from '../layout/header'
import { useParams } from 'react-router'
import XuserHD from './XHD'
import Footer from '../layout/footer'

const HD=()=>{
    const use=useParams();
    return(
        <Uselogin>
        <div className="bodylad">
            <Header />
            <div>
           {use.id? <XuserHD value={use.id} />: <MainHD/>}
            <Login /> 
                          
            </div>
        </div>
        <Footer/> 
        </Uselogin>  
    )
}
export default HD