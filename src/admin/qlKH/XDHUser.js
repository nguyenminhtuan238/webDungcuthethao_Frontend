import Headerad from '../layout/header'
import Navadmin from '../layout/nav'
import { useEffect, useState } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
const QLXDH = () => {
    const id=useParams()
    const [KH,getKH]=useState([])
    const sess=sessionStorage.getItem('admin')
    useEffect(()=>{

        async function Getbill() { 
                const res=await axios.get("http://localhost:5000/api/order/user/"+id.id,{
                    headers:{
                        'Authorization':`Bearer ${sess}`,
    
                    },    
            })  
            const Status=[]
            res.data.orders.map(item => {
                if (item.status) {
                    Status.push({ ...item, createAt: new Date(item.createAt) })
                    getKH(Status)
                }
                return item
            })

        }
     
        Getbill()
    },[])
    return (
        <div className="bodyadmin">
            <div className="container">
                <Headerad />
                <div className="main">
                    <Navadmin />
                    <div className="ftype">
                        <div className="tables">
                            <div className="lasttable">
                                        <div className="back-t">
                                        <Link to="../admin/KH"><i className="fas fa-arrow-left"></i></Link>
                                        </div>
                                <table className="dspd">
                                    <thead>
                                        <tr>
                                            <td>Tên Người Mua</td>
                                            <td>Địa Chỉ</td>
                                            <td>Số điện </td>
                                            <td> Trạng thái</td>
                                            <td>Tổng Đơn Hàng</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            KH.map((item)=>{
                                                return(
                                                    <tr key={item._id}>
                                                        <td>{item.Name}</td>
                                                        <td>{item.Address}</td>
                                                        <td>{item.Phone}</td>
                                                        <td>{item.status?"đã nhận hàng":"Chưa nhận hàng"}</td>
                                                        <td>{item.totalBill.toLocaleString()} VND</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr>
                                            <td colSpan="4">Tổng cộng</td>
                                            <td colSpan="2">{KH.reduce((a,b)=>a+b.totalBill,0).toLocaleString()} VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QLXDH 