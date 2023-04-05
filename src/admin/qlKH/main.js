
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const MainKH = () => {
    const [KH, getKH] = useState([])
    const [NameTK,changNameTK]=useState("")
    const sess = sessionStorage.getItem('admin')
    useEffect(() => {

        async function Getbill() {
            const res = await axios.get("http://localhost:5000/auth/", {
                headers: {
                    'Authorization': `Bearer ${sess}`,

                },
            })
            getKH(res.data.user)

        }
        async function gettime() {
            KH.map(async item => {
                const date = new Date(item.createdUp)
                const datel = new Date()
                const month = (datel.getMonth() + 1) - (date.getMonth() + 1)
                const year = datel.getFullYear() - date.getFullYear()
                const day = datel.getDate() - date.getDate()
                if (year == 1 && day == 0 && month == 0) {
                    const res = await axios.delete("http://localhost:5000/auth/" + item._id, {
                        headers: {
                            'Authorization': `Bearer ${sess}`,

                        },
                    })
                }
            })
        }
        gettime()
        Getbill()
            
       
    }, [])

    function handleSearch(e) {
        e.preventDefault()
            axios.post("http://localhost:5000/auth/",{
                username:NameTK
            }).then(res=>{
                getKH(res.data.user)
                changNameTK("")
            }).catch(err=>{
                console.log(err)
            })
       
    }

    return (
        <div className="ftype">
            <div className="tables">
                <div className="lasttable">
                    <div className="search-date">  
                    <form onSubmit={(e)=>handleSearch(e)}>
                    <input type="text" name="searchTK" className="searchTK" 
                        placeholder="Tìm tài khoản"  value={NameTK} onChange={e=>changNameTK(e.target.value)}/>
                         <button className="bnt-TK" type="summit">Tìm kiếm</button>
                    </form>                
                       
                    </div>
                    <table className="dspd">
                   
                        <thead>
                            <tr>
                                <td>Tên tài khoản</td>
                                <td>Ngày tạo</td>
                                <td>Ngày đăng nhập</td>
                                <td>Thời hạn</td>
                                <td>Đơn Hàng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                KH.map(item => {
                                    return(
                                <tr key={item._id}>
                                    <td>{item.username}</td>
                                    <td>
                                        {new Date(item.createdAt).getDate() + "/" +
                                            `${new Date(item.createdAt).getMonth() + 1}` + "/" +
                                            new Date(item.createdAt).getFullYear()
                                        }
                                    </td>
                                    <td>
                                        {new Date(item.createdUp).getDate() + "/" +
                                            `${new Date(item.createdUp).getMonth() + 1}` + "/" +
                                            new Date(item.createdUp).getFullYear()
                                        }
                                    </td>
                                    <td>
                                        {new Date(item.createdUp).getDate() + "/" +
                                            `${new Date(item.createdUp).getMonth() + 1}` + "/" +
                                            `${new Date(item.createdUp).getFullYear() + 1}`

                                        }
                                    </td>
                                    <td><Link to={"/admin/XDHuser/" + item._id}><i className="far fa-eye"></i>
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

    )



}
export default MainKH