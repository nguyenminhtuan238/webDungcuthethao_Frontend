import Login from '../login'
import {Uselogin} from '../uselogin'
import Header from '../layout/header'
import Maincheck from './main'
import Footer from '../layout/footer'
const Information=()=>{
    
    return(
        <Uselogin>
        <div className="bodylad">
            <Header />
            <div>
            
            <Maincheck/>
            <Login />                
            </div>
        </div>
        <Footer/> 
        </Uselogin>  
    )
}
export default Information