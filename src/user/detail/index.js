import Header from '../layout/header'
import Login from '../login'
import { Uselogin } from '../uselogin'
import Maindetail from './main'
import Footer from '../layout/footer'
const Detail = () => {
  
    return (
        <Uselogin>
            <div className="bodylad">
                <Header />
                <div>
                    <div>
                        <Maindetail  />

                        <Login />
                       
                    </div>

                </div>
            </div>
            <Footer/> 
        </Uselogin>
    )
}
export default Detail