import Login from '../login'
import {Uselogin} from '../uselogin'
import Maincart from './main'
import Header from '../layout/header'
import Footer from '../layout/footer'
const Cart=()=>{
    
    return(
        <Uselogin>
        <div className="bodylad">
            <Header />
            <div>
            <Maincart/>
            
            <Login /> 
                         
            </div>
            
        </div>
        <Footer/>  
        </Uselogin>  
    )
}
export default Cart