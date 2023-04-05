
import axios from 'axios';
import { memo, useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import Swal from 'sweetalert2'
const MainBL = () => {
    const [KH, getKH] = useState([])
    const [NameTK, changNameTK] = useState("")
    const sess = sessionStorage.getItem('admin')
    const [giay, setgiay] = useState([])
    const [time, settime] = useState([])
    const countRef = useRef(null)
    const hanlebancm = async (id) => {
        const { value: gettime } = await Swal.fire({
            title: 'Chọn Mức Phạt',
            input: 'select',
            inputOptions: {
                fivetime: '5 Phút',
                fifteen: '15 phút',
                forever: 'Mãi Mãi',
            },
            inputPlaceholder: 'Chọn Thời gian',
            showCancelButton: true,
          })  
          if (gettime) {
            if(gettime==="fifteen"){
                const futute = new Date().getTime() + 900000
                const res = await axios.put("http://localhost:5000/auth/" + id, {
                    Time: new Date(futute)
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
        
                    },
                })
                const ban=await axios.put("http://localhost:5000/auth/bancm/" + id, {
                    cm: false
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
        
                    },
                })
              
            }
            if(gettime==="fivetime"){
                const futute = new Date().getTime() + 300000
                const res = await axios.put("http://localhost:5000/auth/" + id, {
                    Time: new Date(futute)
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
        
                    },
                })
                const ban=await axios.put("http://localhost:5000/auth/bancm/" + id, {
                    cm: false
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
        
                    },
                })
              
            }else{
                const ban=await axios.put("http://localhost:5000/auth/bancm/" + id, {
                    cm: false
                }, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,
        
                    },
                })
            }
            window.location.reload()
          }
       
    }
    useEffect(() => {

        async function Getbill() {
            const res = await axios.get("http://localhost:5000/auth/", {
                headers: {
                    'Authorization': `Bearer ${sess}`,

                },
            })
            getKH(res.data.user)
            const p=[]
            res.data.user.map(async item => {
              
                
                p.push({...item,minutes:0,seconds:0})
                settime(p)
              
            })
        }

        Getbill()
      
    }, [])
    useEffect(()=>{
        time.map(async item=>{
            const resd = await axios.get("http://localhost:5000/auth/" + item._id)

            const dutime = new Date(resd.data.user.Timeban).getTime()
            countRef.current = setInterval(async () => {
                const now = new Date().getTime();
                const now1 = dutime - now;
                if(now1>0){
                    item.minutes = Math.floor((now1 / (1000 * 60)))
                    item.seconds = Math.floor((now1 % (1000 * 60) / 1000))
                    setgiay([{...item}])
                }else{
                    const ban=await axios.put("http://localhost:5000/auth/bancm/" +  item._id, {
                        cm: true
                    }, {
                        headers: {
                            'Authorization': `Bearer ${sess}`,
            
                        },
                    })
                    clearInterval(countRef.current)
                }
               
            }, 1000)
        })
        return () => {
            clearInterval(countRef.current)
        }
    },[time])
   


    function handleSearch(e) {
        e.preventDefault()
        axios.post("http://localhost:5000/auth/", {
            username: NameTK
        }).then(res => {
            console.log(res.data)
            const p=[]
            res.data.user.map(async item => {
              
                p.push({...item,minutes:0,seconds:0})
                settime(p)
              
            })
            changNameTK("")
        }).catch(err => {
            console.log(err)
        })


    }

    return (
        <div className="ftype">
            <div className="tables">
                <div className="lasttable">
                    <div className="search-date">
                        <form onSubmit={(e) => handleSearch(e)}>
                            <input type="text" name="searchTK" className="searchTK"
                                placeholder="Tìm tài khoản" value={NameTK} onChange={e => changNameTK(e.target.value)} />
                            <button className="bnt-TK" type="summit">Tìm kiếm</button>
                        </form>
                    </div>
                    <table className="dspd">

                        <thead>
                            <tr>
                                <td>Tên tài khoản</td>
                                <td>Ngày tạo</td>
                                <td>Ngày đăng nhập</td>
                                <td>Bình luận</td>
                                <td>cấm bình luận</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                time.map(item => {
                                    return (
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

                                            <td><Link to={"/admin/BL/" + item._id}><i className="far fa-eye"></i>
                                            </Link></td>
                                            <td>
                                                <Link onClick={() => hanlebancm(item._id)}><i className="fas fa-ban"></i></Link>
                                            </td>
                                            <td>{+item.minutes +":"+item.seconds}</td>
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
export default memo(MainBL)