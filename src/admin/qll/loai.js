import { useEffect, useState } from 'react'
import axios from 'axios';
import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const QLloai=()=>{
    const [crtype,createtype]=useState("")
    const [types,gettype]=useState([])
    const navigate=useNavigate()
    const sess=sessionStorage.getItem('admin')
    const [Params]=useSearchParams()
    const search=Object.fromEntries([...Params])
    function handlesubmit(e){
        e.preventDefault()
        axios.post("http://localhost:5000/api/type/",{
            tenloai:crtype
        },{
            headers:{
                'Authorization':`Bearer ${sess}`,
            },
        })
        .then((res)=>{
            createtype("")
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Thêm Loại thành công',
               
              })
            gettype(res.data.types)
        })
        .catch((error)=>{
            if(error.response.status==401){
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Tên Loại đã tồn tại',

                })
            }else{
                console.log(error)
            }
        })
    }
    function  deletel(id) {
        Swal.fire({
            title: 'Bạn có chắc chắc không',
            text: "Bạn muốn xóa sản phẩm này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa sản phẩm'
        }).then((result) => {
            if(result.isConfirmed){
                axios.delete("http://localhost:5000/api/type/"+id,{
                    headers:{
                        'Content-Type':'multipart/form-data',
                        'Authorization':`Bearer ${sess}`,
                    },
                })
                    .then((res)=>{
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Xóa Loại thành công',

                        })
                       gettype(res.data.types)
                    }).catch(error=>{
                        //console.log(error)
                        Swal.fire({
                            icon: 'error',
                            title: 'Thất bại',
                            text: 'Xóa Sản phẩm thất bại',

                        })
                    })
            }
        })

           
                       
    }
    function updateloai(id) {
        navigate(`/admin/editloai/${id}`)
    }
    useEffect(()=>{
        async function getType(){
            if(search.searchl){
                const res=await axios.get("http://localhost:5000/api/type/search/"+search.searchl)
                gettype(res.data.Search)
            }else{
            const res= await  axios.get("http://localhost:5000/api/type/")
                 gettype(res.data.types)
            }
        }
        getType()
    },[])
    return (
        <div className="bodyadmin">
    <div className="container">
       <Headerad/>
       <div className="main">
       <Navadmin/>
       <div className="ftype">
           <h2>Thêm loại sản phẩm</h2>
            <form action="" className="productform" onSubmit={handlesubmit} >
                <div className="input-form ">
                    <label > loại sản phẩm</label>
                    <input type="text" value={crtype} 
                    onChange={(e)=>createtype(e.target.value)}  placeholder="nhập loại sản phẩm"/>

                </div>
                
                <button>Thêm loại sản phẩm</button>
            </form>
            <div className="tables">
                <div className="lasttable">
                 <div className="heading">
                     <h2>Tìm sản phẩm</h2>
                     <form className="searchp" method="get" >
                         <input type="text" name="searchl" placeholder="Tìm kiếm tại đây"/>
                         <label ><i className="fas fa-search" id="loai"></i></label>
                     </form>
                 </div>
                 <table className="dspd">
                     <thead>
                        <tr>
                         <td>Tên loại sản phẩm</td>
                         <td>Sửa loại</td>
                         <td>xóa loại</td>
                         </tr>
                     </thead>
                     <tbody>
                        
                             { 
                                 types.map(item=>{
                                     return(
                                     <tr key={item._id}>
                                     <td>{item.ten_loai}</td>
                                     <td><a onClick={()=>{updateloai(item._id)}}><i className="far fa-edit">

                                     </i></a></td>
                                     <td><a  onClick={()=>deletel(item._id)} ><i className="far fa-trash-alt"></i></a></td>
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
export default QLloai