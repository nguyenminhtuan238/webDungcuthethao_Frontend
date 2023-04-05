import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {Provilogin} from "./../uselogin"
import RingLoader from "react-spinners/RingLoader";
import Swal from 'sweetalert2'
const Maindetail=()=>{
    const handle=useContext(Provilogin)
    const user=sessionStorage.getItem("user")
    const pdid=useParams()
    const [product,getpd]=useState([])
    const [cm,postcm]=useState("")
    const [gcm,getcm]=useState()
    const [mus,getmus]=useState()
    const [nameu,getname]=useState([])
    const [edcm,hleditcm]=useState("")
    const [sl,getsl]=useState(1)
    const [ed,booleaned]=useState(false)
    const [edfocus,getfocus]=useState(0)
    const [node,getnode]=useState("")
    const inputfocus=useRef(null)
    const [loading, setloading] = useState(false)
    const [img,getimg]=useState("")
    useEffect(()=>{
        async function GetPD() {
            const res=await axios.get("http://localhost:5000/api/products/"+pdid.pdid)
            setloading(true)
            getimg(res.data.products.Image)
            getpd(res.data.products)
        }
        GetPD()
    },[pdid.pdid])
    useEffect(()=>{
        async function GetCm() {
            const res=await axios.get("http://localhost:5000/api/comments/")
            getcm(res.data.comments)
        }
        async function verityus() {
          if(user){
            const resu=await axios.get("http://localhost:5000/auth/ref/acl",{
                headers:{
                    'Authorization':`Bearer ${user}`,  
                },
            })
            getmus(resu.data.user)
          }
        }
        async function GetName() {
            const resu=await axios.get("http://localhost:5000/auth")
            getname(resu.data.user)
            
        }
        GetName()
        verityus()
        GetCm()
    },[])
   
    const hanlecm=(e)=>{
        e.preventDefault()
        if(mus.Cm){
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'Bình luận thành công',

            }).then(res=>{
                if(res.isConfirmed){
                    axios.post("http://localhost:5000/api/comments/",{
                namepd:product.Tilte,
                Post_cm:cm
             },{
                headers:{
                    'Authorization':`Bearer ${user}`,
                    
                },
             }).then(res=>{
                inputfocus.current.focus()  
                    postcm(" ")
                    getcm(res.data.cm)
             }).catch(err=>{
                console.log(err)
             })
                }
            })
            
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'tài khoản bị cấm bình luận',

            })
            postcm(" ")
        }
        
        
    }
    const deletecm=(id)=>{
        Swal.fire({
            title: 'Bạn có chắc chắc không',
            text: "Bạn muốn xóa Bình luận này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa Bình luận'
        }).then(res=>{
            if(res.isConfirmed){
                axios.delete("http://localhost:5000/api/comments/"+id,{
                    headers:{
                        'Authorization':`Bearer ${user}`,  
                    },
                }).then(res=>{
                   
                    getcm(res.data.cm)
                }).catch(err=>{
                    console.log(err)
                })
            }
        })
      
    }
    const  editcm=(id,post)=>{
        hleditcm(post)
        getfocus(id) 
        if(ed){
            Swal.fire({
                icon: 'success',
                title: 'Thành công',
                text: 'sửa thành công',
    
            }).then(res=>{
                if(res.isConfirmed){
                    axios.put("http://localhost:5000/api/comments/"+id,{
                Post_cm:edcm
            },{
                headers:{
                    'Authorization':`Bearer ${user}`,  
                },
            }).then(res=>{
                
                getcm(res.data.getCM)
                hleditcm("")
                booleaned(false)
                getfocus(0)
                getnode("")
            }).catch(err=>{
                console.log(err)
            })
                }
            })
        }else{
            booleaned(true)
            getnode("activenoneedit")
            
        }
       
        
    }
    const handlecart=(id)=>{
        axios.get("http://localhost:5000/api/products/"+id)
        .then(res=>{
           const cart=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
           const localc=JSON.parse(localStorage.getItem("cart"))
          if(localc){
              const ex=localc.find((e)=>e.id===id)
              if(ex){
               localc.map((item,index)=>{
                   if(item.id==id){
                        const objectpd={
                            ...item,
                           quantity:item.quantity+Number(sl)
                       }
                       localc[index]=objectpd
                       localStorage.setItem("cart",JSON.stringify(localc))
                       console.log(localc)
                   }
                   
                   })           
              }else{
               const objectpd={
                   id:res.data.products._id,
                   Tilte:res.data.products.Tilte,
                   image:res.data.products.Image,
                   Price:res.data.products.Price,
                   quantity:Number(sl)
               }
               localc.push(objectpd)
               localStorage.setItem("cart",JSON.stringify(localc))  
              }
               
                                
          }else{
           const objectpd={
               id:res.data.products._id,
               Tilte:res.data.products.Tilte,
               image:res.data.products.Image,
               Price:res.data.products.Price,
               quantity:Number(sl)
            }
            cart.push(objectpd)
            localStorage.setItem("cart",JSON.stringify( cart))
          }
          handle.getlk(!handle.lk)
        })
        .catch(err=>{
            console.log(err)
        })
      
    }
    function handleimg(nameImg){
        getimg(nameImg)
    }
    return(
        <div>
            <div className="flex-box">
            <div className="left">
                <div className="big-img">
                {loading?<img src={"http://localhost:5000/img/"+img}/>:<RingLoader
                        loading={loading}
                        className="loading"
                        color={'#36d7b7'}
                        size={100}
                    />}
                </div>
                <div className="images">
                  {loading?product.Image_mall.map((item,index)=>{
                      return(
                        <div className="small-img" key={index}>
                        <img 
                        src={img===item.originalname?"http://localhost:5000/img/"+product.Image:"http://localhost:5000/img/"+item.originalname} 
                        onClick={()=>handleimg(img===item.originalname?product.Image:item.originalname)}/>
                     </div>
                      )
                  }):<RingLoader
                        loading={loading}
                        className="loading"
                        color={'#36d7b7'}
                        size={100}
                    />
                  
                  }
                </div>
            </div>
            <div className="right">
                <div className="url"><Link to="/">Trang chủ</Link> {'>  '+ product.Tilte}</div>
                <div className="pname">{product.Tilte}</div>
               <div className="price">{loading? product.Price.toLocaleString():0} VND</div>
               <div className="quantity">
                   <p>số lượng</p>
                   <input type="number" min={1} max={5}  value={sl} onChange={(e)=>getsl(e.target.value)} />
               </div>
               <div className="product-Ifm">{product.Ifm}</div>
               <div className="btn-box">
                   <button className="cart-btn" onClick={()=>handlecart(product._id)}>Thêm vào giỏ hàng</button>
                   <button className="buy-btn">Mua</button>
               </div>
            </div>
        </div>
        <div className="comment-session">
            <div className="comment-box">
                <form action="" method="POST">
                    <textarea name="comment" value={cm} ref={inputfocus} onChange={(e)=>postcm(e.target.value)} 
                    placeholder="Bình luận"></textarea>
                    {user
                    ?<a className="comment-btn" onClick={hanlecm}>Bình luận</a>:
                    <a className="comment-btn" onClick={handle.handledn} href="#my-dialog">Đăng nhập</a>
                    }
                </form>
            </div>
                    {ed?<textarea ref={inputfocus} value={edcm} onChange={(e)=>hleditcm(e.target.value)} className="textareaEdit"></textarea>:""}
                {
                    gcm && gcm.map(itemcm=>{
                        if(itemcm.ID_pd==product._id){
                        return(

                            <div className="post-comment"  key={itemcm._id}>
                        <div className="list">
                            <div className="usercm">
                                <div className="user-meta">
                                <div className="nameuser">
                                    {nameu&& nameu.map((itemu)=>{
                                        if(itemcm.ID_user===itemu._id){
                                             return itemu.username
                                        }
                                    })}

                                  {user?itemcm.ID_user=== mus.userid?  <span>
                                <Link  onClick={(e)=> editcm(itemcm._id,itemcm.Post_cm)}  
                                className={edfocus===itemcm._id? "cmedit activeedit":"cmedit "+node}>
                                <i className="fas fa-edit"></i></Link>
                                <Link onClick={(e)=> deletecm(itemcm._id)} className="cmdelete">
                                    <i className="fas fa-trash-alt"></i></Link>
                                </span>:"":""}
                                </div>
                                <div className="post-day">{itemcm.Date_post}</div>
                                </div>
                            </div>
                            <div className="comment-post">
                            {itemcm.Post_cm}
                            </div>
                        </div>
                        </div>
                        )}
                    })
                }
                
           
        </div>
        </div>
    )
}
export default Maindetail