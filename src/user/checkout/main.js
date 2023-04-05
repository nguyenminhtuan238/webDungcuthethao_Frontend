import axios from 'axios'
import { useState } from 'react'
import {  useNavigate } from 'react-router'

const Maincheck=()=>{

    const [payment,getpayment]=useState("")
    const [node,getnode]=useState("")
    const sess=sessionStorage.getItem('user')
    const cart=JSON.parse(localStorage.getItem("cart"))
    const [err,geterr]=useState("")
    const Navigate=useNavigate()
    const price=cart?cart.reduce((a,c)=>a+c.Price*c.quantity,0):0
    const handleorder=async (e)=>{
        e.preventDefault()
        const resinf= await  axios.get("http://localhost:5000/auth/user/inf",{
            headers:{
                'Authorization':`Bearer ${sess}`,
            },
        })
       if(resinf.data.user.Name && resinf.data.user.Phone && resinf.data.user.Address){
        axios.post("http://localhost:5000/api/cart",{},{
            headers:{
                'Authorization':`Bearer ${sess}`,
            },
        }).then(res=>{
            cart.map(async (item)=>{
                const resl=await axios.post("http://localhost:5000/api/cartdt",{
                    quantity:item.quantity,
                    idpd:item.id,
                    ID_cart:res.data.newcart._id
                },{
                    headers:{
                        'Authorization':`Bearer ${sess}`,
                    }, 
                })
                console.log(resl.data)
            })
            
            if( payment){
                axios.post("http://localhost:5000/api/order",{
                Name:resinf.data.user.Name,
                Address:resinf.data.user.Address,
                Phone:resinf.data.user.Phone,
                Cart:res.data.newcart._id,
                node:node,
                totalBill:price,
                payment:payment
            },{
                headers:{
                    'Authorization':`Bearer ${sess}`,
                },
            }
            ).then(res=>{
                console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
            Navigate("/DH/")
            localStorage.clear('cart')
            }else{
                e.preventDefault()
                geterr("Phải chọn Phương thức")
            }
        }).catch(err=>{
            console.log(err)
        })
       }else(
           Navigate("/user/")
       )
           

           
        
    }
    return(
        <div className="checkout">
            <h1>THANH TOÁN</h1>
            <p>để hoàn tắt việc mua hàng <b>Dụng Cụ Thể Dục</b>,quý khách vui lòng diền dầy đủ thông tin vào form dưới đây</p>
            <hr/>
            <form  className="formcheck">
                <h3>Thanh Toán & Vận chuyển</h3>
                <div className="form-pay">
                    <label>Thanh toán</label>
                    <div className="checkpay">
                    <input type="radio" value="Trực tiếp" onChange={(e)=>getpayment(e.target.value)} name="pay" />
                    <label htmlFor="direct" className="direct">
                     Thanh toán khi nhận hàng
                    </label>
                    <br/>
                    <input type="radio" name="pay" value="chuyển khoản" onChange={(e)=>getpayment(e.target.value)} className="tranfo"/>
                    <label htmlFor="transfer"  className="direct" >               
                        Thanh toán chuyển khoản
                    </label>
                    </div>
                   
                </div>
                {err?<span className="err">{err}</span> :""}
                <div className="form-pay">
                    <label>Ghi chú đơn hàng</label>
                    <textarea value={node} onChange={(e)=>getnode(e.target.value)} ></textarea>
                </div>
                <div className="check-btn">
                    <button onClick={(e)=>handleorder(e)}><i className="fas fa-check"></i> HOÀN TẤT ĐẶT HÀNG</button>
                </div>
            </form>
        </div>
    )
}
export default Maincheck