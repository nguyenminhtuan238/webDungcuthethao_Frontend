import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const XuserHD = ({value}) => {
    const [DH, getDH] = useState([])
    const sess = sessionStorage.getItem('user')
    const [loading, setloading] = useState(false)
    const [total, gettotal] = useState([])
    useEffect(() => {
        async function Getbill() {
            const Status = []
            if (sess) {
                const rescart = await axios.post("http://localhost:5000/api/cartDT/cart", {
                    ID_cart: value
                })
              const itemcart = []
             rescart.data.cartdt.map(async item => {
                const l = []
                 axios.get("http://localhost:5000/api/products/" + item.ID_pd)
                    .then(respd => {
                        l.push(item.Total)
                        gettotal(l)
                        itemcart.push({ ...respd.data.products, total: item.Total, quantity: item.quantity })
                        //console.log(itemcart)
                        getDH(itemcart)
                    }).catch(err => {
                        console.log(err)
                    })
                return itemcart
            })
            console.log(itemcart)
            setloading(true)

            }
        }
        Getbill()
    }, [])
   
    return (
        <div className="bill">
            <div className="tables">
                <div className="lasttable">
                     <h1>Hóa Đơn</h1>
                    <table className="dspd">
                    <thead>
                                        <tr>
                                            <td>Tên Sản Phẩm</td>
                                            <td>Hình Ảnh</td>
                                            <td>Giá</td>
                                            <td>Số Lượng</td>
                                            <td>Thành tiền</td>
                                            
                                        </tr>
                                    </thead>
                                    {
                                        loading? <tbody>
                                    
                                    {
                                        DH.map(item => {
                                            return (
                                                <tr key={item._id}>
                                                    <td>{item.Tilte}</td>
                                                    <td ><img src={"http://localhost:5000/img/" + item.Image} /></td>
                                                    <td>{item.Price.toLocaleString()} VND</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total.toLocaleString()} VND</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td colSpan="2">Tổng Tiền </td>
                                        <td >{DH.reduce((a, c) => a + c.Price * c.quantity, 0).toLocaleString()} VND</td>
                                    </tr>
                                </tbody>:""
                                    }
                                   
                    </table>
                    <div className="cart-buy">
                        <button className="cart-back">
                            <Link to="/" className="back">
                                <i className="far fa-arrow-alt-circle-left"></i>TIẾP TỤC MUA
                            </Link>
                        </button>
                        <div className="cart-pay">
                            <Link className="back" to="/HD">Hóa Đơn</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default XuserHD