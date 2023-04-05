import { useEffect, useState } from 'react'
import axios from 'axios';
import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import DatePicker from 'react-date-picker';
import { Link } from 'react-router-dom';
const QLdh = () => {
    const [value, onChange] = useState(new Date());
    const [bill,getbill]=useState([])
    useEffect(()=>{
        async function Getbill() { 
            const Status=[]  
                const res=await axios.get("http://localhost:5000/api/order/",{
                })
                res.data.orders.map(item=>{
                    if(!item.status){
                        Status.push(item)
                        getbill(Status)
                    }
                })
                
              
        }
        Getbill()
    },[])
    const handledate= async (e)=>{
        e.preventDefault()
        const donhang=[]
        const res=await axios.get("http://localhost:5000/api/order/",{
        })
        res.data.orders.reduce((a,b)=>{
            const date=new Date(b.createAt)
            if(!b.status){
            if(value===null){        
                donhang.push(b)
                getbill(donhang)
            }else{
            if(
                date.getDay()===value.getDay() 
                && date.getMonth()===value.getMonth() 
                && date.getFullYear()===value.getFullYear()
            )
            {   
                donhang.push(b)
                getbill(donhang)
            }else{
                getbill(donhang)
            }
            }
            }
        },0)
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
                                    <form>
                                        <DatePicker onChange={onChange} value={value} />
                                        <button onClick={(e) => handledate(e)}>Tìm kiếm </button>
                                    </form>
                                </div>
                                <table className="dspd">
                                    <thead>
                                        <tr>
                                            <td>Tên Khách hàng</td>
                                            <td>Số điện thoại</td>
                                            <td>Địa chỉ</td>
                                            <td>Hình Thức</td>
                                            <td>Ngày đặt</td>
                                            <td>Duyệt</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {  
                                            bill.map(item=>{
                                                
                                                return(  
                                                   
                                                    <tr key={item._id}>
                                                        <td>{item.Name}</td>
                                                        <td>{item.Phone}</td>
                                                        <td>{item.Address}</td>
                                                        <td>{item.payment}</td>
                                                        <td>{item.createAt}</td>
                                                        <td><Link to={"/admin/XDH/"+item._id}><i className="far fa-eye"></i>
                                                        </Link></td>
                                                    </tr>
                                                )
                                                
                                            }) 
                                        }
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
export default QLdh