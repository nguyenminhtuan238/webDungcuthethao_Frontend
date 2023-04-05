import { useEffect, useState } from 'react'
import axios from 'axios';
import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2'
const XDH = () => {
    const id = useParams()
    const [bill, getbill] = useState([])
    const Navigate = useNavigate()
    const [total, gettotal] = useState([])
    const [Kho, getKho] = useState(() => {
        const localKho = JSON.parse(localStorage.getItem("Kho"))
        return localKho ?? []
    })
    const sess = sessionStorage.getItem('admin')

    useEffect(() => {
        async function Getbill() {
            const res = await axios.get("http://localhost:5000/api/order/" + id.idDH)
            const cart = res.data.orders[0].ID_Cart

            const rescart = await axios.post("http://localhost:5000/api/cartDT/cart", {
                ID_cart: cart
            })
            const itemcart = []
            const itemca = []
            rescart.data.cartdt.map(item => {
                const l = []
                axios.get("http://localhost:5000/api/products/" + item.ID_pd)
                    .then(respd => {
                        l.push(item.Total)
                        itemcart.push({ ...respd.data.products, total: item.Total, quantity: item.quantity })
                        gettotal(l)
                        getbill(itemcart)
                        const updateKho = respd.data.products.Kho - item.quantity
                        const daban = respd.data.products.Daban + item.quantity
                        itemca.push({id:item._id,ID_pd: item.ID_pd, Tilte: respd.data.products.Tilte, up: updateKho,daban:daban })
                        getKho(() => {
                            localStorage.setItem("Kho", JSON.stringify(itemca))
                            return itemca
                        })
                    }).catch(err => {
                        console.log(err)
                    })

            })
        }
        Getbill()
    }, [])
    const handleXHD = async () => {

        for (let i = 0; i < Kho.length; i++) {
            if (Kho[i].up <= 0) {
                const alert="Sản Phẩm " + Kho[i].Tilte + " trong Kho Không đủ vui lòng nhập thêm"
                
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: alert,

                })
                break;
            } else {
                console.log(Kho[i].up)
                axios.put("http://localhost:5000/api/products/Kho/" + Kho[i].ID_pd, {
                    Kho: Kho[i].up
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,

                    },
                })
                axios.put("http://localhost:5000/api/products/Daban/" + Kho[i].ID_pd, {
                    Daban: Kho[i].daban
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,

                    },
                })
                axios.put("http://localhost:5000/api/cartDT/confirm/" + Kho[i].id)
                axios.put("http://localhost:5000/api/order/" + id.idDH)
                    .then(res => {
                        console.log(res)

                    }).catch(err => {
                        console.log(err)
                    })
                Navigate("/admin/DH/")
            }
        }


    }
    return (
        <div className="bodyadmin">
            <div className="container">
                <Headerad />
                <div className="main">
                    <Navadmin />
                    <div className="ftype">
                        <div className="tables">
                            <div className="lasttable">
                                <div className="search-date">

                                </div>
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
                                    <tbody>
                                        {
                                            bill.map(item => {
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
                                            <td >{bill.reduce((a, c) => a + c.Price * c.quantity, 0).toLocaleString()} VND</td>
                                            <td colSpan="2">Duyệt</td>
                                            <td><a onClick={() => handleXHD()}><i className="fas fa-check"></i>
                                            </a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default XDH