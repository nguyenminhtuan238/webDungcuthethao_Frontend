import Header from './layout/header'
import Login from './login'
import {Uselogin} from './uselogin'
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Footer from './layout/footer'
const Search=()=>{    
    const [pds,getpd]=useState([])
    const [types,getType]=useState([])
    const [Params]=useSearchParams()
    const search=Object.fromEntries([...Params])
   useEffect(()=>{
    
    async function  GetTypes() {
        const resT=await axios.get("http://localhost:5000/api/type/")
        getType(resT.data.types)
    }
    async function searchpd() {
        if(search.type==="Tất cả"){
           if(search.search){
            const res=await axios.get("http://localhost:5000/search/search="+search.search)
            getpd(res.data.Search)
           }else{
            const res= await axios.get("http://localhost:5000/api/products/")
            getpd(res.data.products)
           }  
        }else{
            const Search=search.search
            const type=search.type
            const res=search.search
            ?await axios.get("http://localhost:5000/search/type/search="+Search+"&type="+type)
            :await axios.get("http://localhost:5000/search/setype/"+search.type)
            getpd(res.data.Search)
           
        }
      
    }
    searchpd()
    
    GetTypes()
   },[search])
    return(
        <Uselogin>
        <div className="bodylad">
            <Header />
            <div>
            <div className="products">
            <div className="containertc">
                <div className="product-item">
                {
                    pds.map(item=>{
                        return(
                            <div className="product" key={item._id}>
                        <div className="product-content"  >
                            <div className="product-img">
                                <img src={"http://localhost:5000/img/"+item.Image}  alt="Hình ảnh sản phẩm"/>
                            </div>
                            <div className="product-btn">
                                <button type="button" className="btn-cart">thêm vào giỏ hàng
                                    <span><i className="fas fa-plus"></i></span>
                                </button>
                                <button type="button" className="btn-buy">
                                    Mua 
                                    <span>
                                        <i className="fas fa-shopping-cart"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                       
                        <div className="product-info">
                            <h2 className="sm-title">{
                                types.map(type=>{
                                    if(item.ID_loai===type._id){
                                        return( type.ten_loai)
                                    }
                                })
                            }</h2>
                            <Link to={"detail/"+item._id} className="product-name">{item.Tilte}</Link>
                            <p className="product-price">{item.Price.toLocaleString()} VND</p>
                        </div>
                    </div>
                        )
                    })
                }
                    
                </div>
            </div>
        </div>
            <Login />                
            </div>
        </div>
        <Footer/>
        </Uselogin>
    )
}
export default Search