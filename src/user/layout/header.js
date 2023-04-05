import axios from "axios"
import { memo, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {  useNavigate } from 'react-router'
import { Provilogin } from "./../uselogin"
import Userimg from '../../img/user.png'
const Header = () => {
    const user = sessionStorage.getItem("user")
    const [img, getimg] = useState([])
    const [types, gettype] = useState([])
    const handle = useContext(Provilogin)
    const [path, getpath] = useState([])
    const Navigate=useNavigate()
    const [loading, setloading] = useState(false)
    const localcart=localStorage.getItem("cart")!==null? JSON.parse(localStorage.getItem("cart")).length:0
    const cart=localcart!==0? JSON.parse(localStorage.getItem("cart")).length:0
    const [s, gets] = useState(cart)
    const handlelogout = () => {
        sessionStorage.removeItem("user")
        Navigate('/')
    }
   
    useEffect(() => {
        if (user) {
            axios.get("http://localhost:5000/auth/user/inf", {
                headers: { 'Authorization': `Bearer ${user}` }
            })
                .then(res => {
                    getimg(res.data.user.img)
                    setloading(true)

                }).catch(err => {
                    console.log(err)
                })
        }
        async function GetType() {
            const res = await axios.get("http://localhost:5000/api/type/")
            gettype(res.data.types)
        }
       
        GetType()
        getpath(window.location.pathname)
        gets(cart)
    }, [handle.lk])
    function hanelsearch() {

    }
    return (
        <header>


            <Link className="logo" to="/"><i className="fas fa-home"></i><span>ShopDC</span></Link>
            <form className="searchtc" method="Get" action="/timkiem/">
                <input type="text" name="search" placeholder="Tìm kiếm tại đây" />
                <label ><i className="fas fa-search icon-s" onSubmit={hanelsearch}></i></label>
                <select name="type">
                    <option >Tất cả</option>
                    {types &&
                        types.map(item => {
                            return (

                                <option key={item._id}>{item.ten_loai}</option>
                            )
                        })
                    }
                </select>
            </form>
            <ul className="navbar">
                <li><Link className={path==="/"?"ahd activehd":"ahd"} to="/" >Trang Chủ</Link></li>
                <li><Link className={path==="/GT"?"ahd activehd":"ahd"}>Giới thiệu</Link></li>
                <li><Link to="/cart/" className={path==="/cart/"?"ahd activehd":"ahd"}>
                    <i className="fas fa-shopping-cart"></i> <span className="badge">{s}</span></Link></li>
            </ul>
            <div className="mainhd">
         
                {user && loading ?
                    <Link to="/user/" className="ahd userhd ">
                    <img src={img===null?Userimg:"http://localhost:5000/userimg/"+img} /></Link>
                    : ""}
                {user
                    ? <li><a className="btnlogin" onClick={handlelogout} href="#my-dialog">Đăng xuất</a></li>
                    : <li><a className="btnlogin" onClick={handle.handledn} href="#my-dialog">Đăng Nhập</a></li>}

            </div>

        </header>
    )
}
export default memo(Header)