import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Provilogin } from "../uselogin"
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
const Maincart = () => {
    const handle=useContext(Provilogin)
    const [getcart,setsl]=useState(()=>{
        return JSON.parse(localStorage.getItem("cart")) || []
    })
    const price=getcart?getcart.reduce((a,c)=>a+c.Price*c.quantity,0):0
    const user=sessionStorage.getItem("user")
    localStorage.setItem("cart",JSON.stringify(getcart)??[])
    const Navigate=useNavigate()
    function  hanledelete(id) {
        const ex=getcart.find((x)=>x.id===id)
       if(ex){
        const ob=getcart.filter((e)=>e.id!==id)
        setsl(ob)
        localStorage.setItem("cart",JSON.stringify(ob))
        handle.getlk(!handle.lk)
       }
    }
     function  addsl(id) {
        const ex=  getcart.find((x)=>x.id===id)
        if(ex){
            
         setsl( getcart.map((item)=>
                item.id===id?       
                   {
                        ...item,
                       quantity:item.quantity+1
                   }:item        
               ))
              
        }
        
    }
    function  munussl(id) {
        const ex=getcart.find((x)=>x.id===id)
        //console.log(ex.quantity)
        if(ex){
            setsl(getcart.map((item)=>
                item.id===id?       
                   {
                        ...item,
                       quantity:item.quantity==1?1:item.quantity-1
                   }:item        
               ))
        }
        
    }
    const handleTT=()=>{
        if(getcart.length===0 || !getcart){
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'giỏ Hàng của bạn rỗng',
               
              })
        }else{
            Navigate("/checkout/")
        }
        
    }
    return (
        <div className="tabcart">
        <div className="lastcart">
            <div><h1>Giỏ Hàng</h1></div>
            <table className="cart">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>số lượng</th>
                        <th>Xóa</th>       
                    </tr>
                </thead>
                <tbody>
                {   getcart&&
                    getcart.map((item) => {
                        return (
                         
                                <tr key={item.id}>
                                    <td><p>{item.Tilte}</p></td>
                                    <td><img src={"http://localhost:5000/img/"+item.image} /></td>
                                    <td ><p>{item.Price.toLocaleString()} VND</p></td>
                                    <td><div className="quantity-cart">
                                    <input type="button" onClick={()=>munussl(item.id)} className="munus is-form" value="-"/>
                                     <input type="number" value={item.quantity} className="input-qty "/>
                                    <input type="button" onClick={()=>addsl(item.id)} className="add is-form" value="+"/>
                                    </div>
                                    </td>
                                    <td><a  onClick={()=>hanledelete(item.id)}>
                                    <i className="far fa-trash-alt"></i></a></td>
                                   
                                </tr>
                            
                        )
                        
                    })
                }
                    <tr >
                        <td colSpan="3"><p>Tổng tiền</p></td>
                        <td colSpan="2"><p>{price.toLocaleString()} VND</p></td>
                    </tr>
                </tbody>
            </table>
            <div className="cart-buy">
            <button className="cart-back">
                <Link to="/" className="back">
                <i className="far fa-arrow-alt-circle-left"></i>TIẾP TỤC MUA
                </Link>
            </button>
            
            {user?<button className="cart-DH" onClick={()=>Navigate('/DH/')}>
                <Link  className="back">
                <i className="fab fa-jedi-order"></i>Đơn Hàng
                </Link>
                </button>:""
                }
            {user?<button className="cart-pay" onClick={()=>handleTT()}>
                <Link  className="back">
                <i className="fas fa-shopping-cart"></i>THANH TOÁN
                </Link>
                </button>:
                <div className="cart-pay">
                <a className="back" onClick={handle.handledn} href="#my-dialog">Đăng nhập</a>
                </div>
               
                    
                }
            </div>
            
        </div>
       
        </div>
    )
}
export default Maincart