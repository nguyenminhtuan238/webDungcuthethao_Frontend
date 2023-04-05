import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
const MainHD = () => {
    const [value, onChange] = useState(new Date());
    const [DH, getDH] = useState([])
    const sess = sessionStorage.getItem('user')
    useEffect(() => {
        async function Getbill() {
            const Status = []
            if (sess) {
                const res = await axios.get("http://localhost:5000/api/order/bill/getB", {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
                    },
                })
                res.data.orders.map(async item => {
                    if (item.status) {
                        Status.push(item)
                        getDH(Status)

                    }
                })

            }
        }
        Getbill()
    }, [])
    const handledate = async (e) => {
        e.preventDefault()
        const donhang = []
        if (sess) {
            const res = await axios.get("http://localhost:5000/api/order/bill/getB", {
                headers: {
                    'Authorization': `Bearer ${sess}`,
                },
            })
            res.data.orders.reduce(async (a, b) => {
                const date = new Date(b.createAt)
                if (b.status) {
                    
                    if (value === null) {
                        donhang.push(b)
                        getDH(donhang)
                    } else {
                        if (
                            date.getDay() === value.getDay()
                            && date.getMonth() === value.getMonth()
                            && date.getFullYear() === value.getFullYear()
                        ) {
                            donhang.push(b)
                            getDH(donhang)
                        } else {
                            getDH(donhang)
                        }
                    }
                }
            }, 0)
        }

    }
    return (
        <div className="bill">

            <div className="tables">
                <div className="lasttable">
                    <div className="search-date">
                        <form>
                            <DatePicker onChange={onChange} value={value} />
                            <button onClick={(e) => handledate(e)}>Tìm kiếm </button>
                        </form>
                    </div>
                    <table className="dspd">
                        <thead>
                            <tr>
                                <td>Họ và tên</td>
                                <td>Hình thức</td>
                                <td>Trạng thái</td>
                                <td>tổng tìên</td>
                                <td>Ngày Nhận</td>
                                <td>Xem</td>
                            </tr>

                        </thead>
                        <tbody>

                            {sess ?
                                DH &&
                                DH.map(item => {
                                    return (
                                        <tr key={item._id}>
                                            <td >{item.Name}</td>
                                            <td >{item.payment}</td>
                                            <td >{!item.status ? "Chưa nhận hàng" : "sản phẩm đã nhận"}</td>
                                            <td>{item.totalBill.toLocaleString()} VND</td>
                                            <td>{new Date(item.createAt).getDate() + "/" +
                                                `${new Date(item.createAt).getMonth() + 1}` + "/" +
                                                new Date(item.createAt).getFullYear()}</td>
                                            <td><Link to={"/HD/"+item.ID_Cart}>Chi Tiết</Link></td>
                                        </tr>
                                    )
                                })
                                :
                                <tr ><td colSpan="4">Không có hòa đơn</td> </tr>
                            }
                        </tbody>
                    </table>
                    <div className="cart-buy">
                        <button className="cart-back">
                            <Link to="/" className="back">
                                <i className="far fa-arrow-alt-circle-left"></i>TIẾP TỤC MUA
                            </Link>
                        </button>
                        <div className="cart-pay">
                            <Link className="back" to="/DH">Đơn Hàng</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainHD