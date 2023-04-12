import { useEffect, useState } from 'react'
import Header from './layout/header'
import Pagination from './layout/pagination'
import Login from './login'
import Products from './products'
import { Uselogin } from './uselogin'
import RingLoader from "react-spinners/RingLoader";
import Footer from './layout/footer'
import SwiperPage from './layout/Swiper'

const Trangchu = () => {
    const [loading, setloading] = useState(false)
    return (

        <Uselogin>
        
        <Header/>
        {
            loading ?"":<SwiperPage/>
        }
        
            <div className="bodylad">
            {loading ?
                <RingLoader
                    loading={loading}
                    className="loading"
                    color={'#36d7b7'}
                    size={100}
                /> : <div>
                   
                    <Products loading={setloading}/>
                    <Login />
                    <Pagination />
                    
                </div>
                }
                
            </div>
            <Footer/>
        </Uselogin>
    )
}
export default Trangchu