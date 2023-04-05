import { useEffect, useState } from 'react'
import axios from 'axios';
import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import { useParams,useNavigate } from 'react-router';
import Swal from 'sweetalert2'
const Editloai=()=>{
    const {lid}=useParams()
    const [updatetype,hanletype]=useState("")
    const sess=sessionStorage.getItem('admin')
    const Navigate = useNavigate()
    const handlesubmit=(e)=>{
        e.preventDefault()
        
     axios.put("http://localhost:5000/api/type/"+lid,{
            tenloai:updatetype
        },{
            headers:{
                'Authorization':`Bearer ${sess}`,
            },
        }).then(res=>{
            if(res.data){
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Sửa Loại thành công',
                   
                  }).then(res=>{
                      if(res.isConfirmed){
                        Navigate("/admin/type/")
                      }
                  })
                 
                }
        }).catch(err=>{
            if (err.response.status == 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Tên Loại đã tồn tại',

                })
            } else {
                console.log(err)
            }
        })
        
    }
    useEffect(()=>{
        axios.get("http://localhost:5000/api/type/"+lid)
        .then(res=>{
            const datal=res.data.types
            hanletype(datal.ten_loai)
        }).catch(err=>{
            console.log(err)
        })
    },[lid])
    return (
        <div className="bodyadmin">
    <div className="container">
       <Headerad/>
       <div className="main">
       <Navadmin/>
       <div className="ftype">
           <h2>Sửa loại sản phẩm</h2>
            <form className="productform"  onSubmit={handlesubmit} >
                <div className="input-form ">
                    <label > loại sản phẩm</label>
                    <input type="text" value={updatetype} 
                    onChange={(e)=>hanletype(e.target.value)}  placeholder="Sửa loại sản phẩm"/>

                </div>
                
                <button>Sửa loại sản phẩm</button>
            </form>
            
       </div>
        </div>
   </div>
</div>
    )
}
export default Editloai