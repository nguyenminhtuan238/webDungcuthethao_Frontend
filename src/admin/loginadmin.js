import {  useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Loginadmin=()=>{
    const [hidden,seth]=useState("")
    const [username,getusername]=useState("")
    const [password,getpassword]=useState("")
    const [err,geterr]=useState("")
    const handledn=()=>{
        const con=hidden===""?"active-popup":""
        seth(con)
    }
    const handlesummit = async (e)=>{
        e.preventDefault()
      try {
        const res= await axios.post("http://localhost:5000/auth/login",{
            username:username,
            password:password
        })
            const token= await res.data.accesstoken
            const reqs= await axios.get("http://localhost:5000/auth/ref/acl",{
                headers:{'Authorization':`Bearer ${token}`}
            }).then(
                sessionStorage.setItem("admin",token)  
            )
            if(reqs.data.user.role===1){
               window.location.reload()
            }else{
                
                geterr("mật khẩu hoặc tài khoản của bạn không đúng")
            }
    
       
        
      } catch (err) {
        if(err.response.status===400){
            
            geterr("mật khẩu hoặc tài khoản của bạn không đúng")
        }
        
      }
    }
    return(
        <div className="bodylad">
            <header>
       
            <Link className="logo"><i className="fas fa-home"></i><span>Admin</span></Link>
            <div className="mainhd">
                <li><Link className="btnlogin" onClick={handledn}>Đăng Nhập</Link></li>
            </div>
    </header>
    <main >
        <div className={"wrapper "+hidden}>
            <span className="icon-close" onClick={handledn}>
                <i className="fas fa-times"></i>
            </span>
            <div className="form-box login"  >
                <h2>Đăng nhập</h2>
                <form action="" onSubmit={handlesummit}>
                    <div className="input-box">
                        <span className="icon">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <input type="text" value={username} onChange={(e)=>getusername(e.target.value)} required/>
                        <label >Username</label>
                    </div>
                    <div className="err">{err}</div>
                    <div className="input-box">
                        <span className="icon">
                            <i className="fas fa-lock"></i>
                        </span>
                        <input type="password" value={password} onChange={(e)=>getpassword(e.target.value)} required/>
                        <label >Password</label>
                        
                    </div>
                    <div className="err">{err}</div>
                    <div className="remember-forgot">
                        <label ><input type="checkbox"/>
                        Nhớ mật khẩu
                        </label>
                        
                    </div>
                    <button type="submit" className="btn" >Đăng nhập</button>
                </form>
            </div>
           
        </div>
    </main>
        </div>
    )
}
export default Loginadmin