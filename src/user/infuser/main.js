import axios from 'axios'
import { useEffect, useState,useContext} from 'react'
import Userimg from '../../img/user.png'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Provilogin } from "./../uselogin"
const Informatinuser=()=>{
    const [Name,getName]=useState("")
    const [Phone,getPhone]=useState("")
    const [Address,getaddress]=useState("")
    const [err,geterr]=useState("")
    const [img,getimg]=useState("")
    const [uimg,setimg]=useState("")
    const handle = useContext(Provilogin)
    const sess=sessionStorage.getItem('user')
    useEffect(()=>{
            async function getinf(){
                const res=await  axios.get("http://localhost:5000/auth/user/inf",{
                    headers:{
                        'Authorization':`Bearer ${sess}`,
                    },
                })
                if(res.data.user.Name && res.data.user.Phone && res.data.user.Address){
                    getName(res.data.user.Name)
                getPhone(res.data.user.Phone)
                getaddress(res.data.user.Address)
                getimg(res.data.user.img)
                setimg("http://localhost:5000/userimg/"+res.data.user.img)
                }
                
            }
            getinf()
    },[])
    function hanhlefile(e){
        getimg(e.target.files[0])
        setimg(URL.createObjectURL(e.target.files[0]))
    }
    const handleupdate=async (e)=>{
        e.preventDefault()
      const res=await  axios.put("http://localhost:5000/auth/infmation/user",{
            Name:Name,
            Address:Address,
            Phone:Phone,
            imguser:img
        },{
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${sess}`,
            },
        })
        if(res.data.user){
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Cập Nhật Thông Tin Thành Công',

            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Thất Bại',
                text: 'Cập Nhật Thông Tin Thất Bại',

            })
        }
        handle.getlk(!handle.lk)
    }
   function chooseimg(e){
       e.preventDefault()
       document.getElementById("HNen").click()
   }
    return(
        <div className="checkout">
        <form  className="formcheck">
            <h3>Thông tin khách hàng</h3>
            <div className="form-check">
                <label>Họ và tên*</label>
                <input type="text" value={Name} onChange={(e)=>getName(e.target.value)}/>
                {err?<span>{err}</span> :""}
            </div>
            <div className="form-check">
                <label>Điện Thoại*</label>
                <input type="number" value={Phone} onChange={(e)=>getPhone(e.target.value)} />
                {err?<span>{err}</span> :""}
            </div>
            <div className="form-check">
                <label>Địa chỉ*</label>
                <input type="text" value={Address} onChange={(e)=>getaddress(e.target.value)}/>
                {err?<span>{err}</span> :""}
            </div>
            <div className="form-check">
                <label>Hình Nền</label>
                <input type="file" onChange={hanhlefile} name="imguser" id="HNen" hidden/>
                <button onClick={(e)=>chooseimg(e)}>Chọn ảnh</button>
                {err?<span>{err}</span> :""}
                
            </div>
            <div className="form-check">
            <Link to="/user/" className="ahd  upuser">
            <img src={img===null?Userimg:uimg} /></Link>
            </div>
            <div className="check-btn">
                <button onClick={(e)=>handleupdate(e)}><i className="fas fa-check"></i> Cập nhật</button>
            </div>
        </form>
    </div>
    )
}
export default Informatinuser