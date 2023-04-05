import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2'
const Editpd = () => {
    const {pdid}=useParams()
    const[Types,getType]=useState([])
    const Navigate = useNavigate()
    const [Tilte,Titlechang]=useState("")
    const [Price,Pricechang]=useState("")
    const [tenloai,loaichang]=useState("")
    const [Kho,Khochang]=useState("")
    const [ifm,ifmchang]=useState("")
    const [image,imagechang]=useState("")
    const [photo, imagemallchang] = useState(null)
    const sess=sessionStorage.getItem('admin')
    useEffect( ()=>{
         function gettypes(){      
            axios.get("http://localhost:5000/api/products/"+pdid)
            .then(async respd=>{
               const res= await  axios.get("http://localhost:5000/api/type/")
               const type=res.data.types.filter(item=>item._id===respd.data.products.ID_loai)
                getType(res.data.types.filter(item=>item._id!==respd.data.products.ID_loai))
                const datapdid=respd.data.products
                Titlechang(datapdid.Tilte)
                Pricechang(datapdid.Price)
                loaichang(type[0].ten_loai )
                Khochang(datapdid.Kho)
                ifmchang(datapdid.Ifm)
                imagechang(datapdid.Image)
            }).catch(err=>{
                console.log(err)
            })
         }
         gettypes()
         
    },[])

    function handleImage(e){
        imagechang(e.target.files[0])
    }
    function handleImagemall(e){
       
            imagemallchang(e.target.files)       
    }
    const handlesubmit=async (e)=>{
        e.preventDefault()
        const config={
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${sess}`,
            },
        }
        const respd= await axios.get("http://localhost:5000/api/products/"+pdid)
        const resp=  await axios.put("http://localhost:5000/api/products/Image/"+pdid,{
                photo
            },config)
       const res= await axios.put("http://localhost:5000/api/products/"+pdid,{
            Tilte:Tilte,
            Price:Price,
            tenloai:tenloai===null?respd.data.products.ID_loai:tenloai,
            image:image,
            Kho:Kho,
            ifm:ifm
        },config)
        if(res.data){
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Sửa Sản phẩm thành công',
               
              })
            Navigate("/admin/product/")
        }
        
    }
  
   
    return (
        <div className="bodyadmin">
            <div className="container">
                <Headerad/>
                <div className="main">
                    <Navadmin/>
                    <div className="fproduct">
            <h2>Sửa sản phẩm</h2>
            <form  className="productform" onSubmit={handlesubmit} >
                <div className="input-form ">
                    <label >Tên sản phẩm</label>
                    <input type="text" value={Tilte} onChange={e=>Titlechang(e.target.value)} placeholder="nhập tên sản phẩm" />

                </div>
                <div className="input-form ">
                    <label >Loại sản phẩm</label>
                    <div className="select-box">
                        <select value={tenloai} onChange={e=>loaichang(e.target.value)} >
                                    <option value={tenloai}>{tenloai}</option>
                            {   
                                Types.map(item=>{
                                    return(
                                        
                                        <option key={item._id} value= {item.ten_loai}>
                                            { item.ten_loai}
                                        </option>
                                    )
                                })
                            }
                           
                        </select>
                    </div>
                </div>
                <div className="input-form ">
                    <label >Hình ảnh</label>
                    <input type="file" onChange={handleImage} placeholder="nhập tên sản phẩm" />
                </div>
              
                <div className="column">
                    <div className="input-form ">
                        <label >Giá</label>
                        <input type="number" value={Price} onChange={e=>Pricechang(e.target.value)} placeholder="nhập  giá" required />
                    </div>
                    <div className="input-form ">
                        <label >Kho</label>
                        <input type="number" value={Kho} onChange={e=>Khochang(e.target.value)} placeholder="nhập kho" required />
                    </div>
                </div>
                <div className="input-form ">
                            <label >Hình ảnh Nhỏ</label>
                            <input type="file" onChange={handleImagemall} placeholder="nhập tên sản phẩm" name="photo" multiple/>
                        </div>
                <div className="input-form ">
                    <label >Thông tin sản phẩm</label>
                    <textarea value={ifm} onChange={e=>ifmchang(e.target.value)} id="" placeholder="nhập thông tin sản phẩm"></textarea>
                </div>
                <button>sửa sản phẩm</button>
            </form>
           
        </div>
                </div>
            </div>
        </div>
    )
}
export default Editpd