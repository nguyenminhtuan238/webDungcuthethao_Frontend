import axios from "axios"
import { useContext, useState } from "react"
import { Provilogin } from "./uselogin"

const Login = () => {
    const handle = useContext(Provilogin)
    const [username, uschang] = useState("")
    const [password, pwchang] = useState("")
    const [testpass, testpw] = useState("")
    const handlech=()=>{
        handle.hlsetdk()
        pwchang("")
        uschang("")
        testpw("")

    }
    async function handlelogin(e) {
        e.preventDefault()

        try {
            const res = await axios.post("http://localhost:5000/auth/login", {
                username: username,
                password: password,
                createdUp:Date.now()
            })
            const token = res.data.accesstoken
            sessionStorage.setItem("user", token)
            window.location.reload()

        } catch (error) {
            if (error.response.status = 400) {
                pwchang("")
                uschang("")
                testpw("")
                handle.geterrdn("mật khẩu hoặc tài khoản của bạn không đúng")
                setTimeout(() => {
                    handle.geterrdn("")
                }, 2000);
            }
        }
       
    }
    
    async function handleregister(e) {
        e.preventDefault()
        try {
            if (password == testpass) {
                const res = await axios.post("http://localhost:5000/auth/register", {
                    username: username,
                    password: password,
                    createdUp:Date.now()
                })
                const token = res.data.accesstoken
                sessionStorage.setItem("user", token)
                window.location.reload()
            } else {
                handle.geterrdn("Mật khẩu nhập lại không khớp")
                setTimeout(() => {
                    handle.geterrdn("")
                }, 2000);
                pwchang("")
                uschang("")
                testpw("")
            }
        } catch (error) {
            if (error.response.status = 400) {
                pwchang("")
                uschang("")
                testpw("")
                handle.geterrdn("Username của bạn đã tồn tại")
                setTimeout(() => {
                    handle.geterrdn("")
                }, 2000);
            }
        }
    }
    return (
        <div className="dialog overlay " id="my-dialog">
            <div className={"dialog-body wrapper " + handle.hidden + " " + handle.dk}>
                <a href="#" onClick={handle.handledn} className="icon-close"><i className="fas fa-times"></i></a>
                <div className="form-box login">
                    <h2>Đăng nhập</h2>
                    <form onSubmit={handlelogin}>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input type="text" value={username} onChange={(e) => uschang(e.target.value)} required />
                            <label >Username</label>
                            { handle.errdn=="mật khẩu hoặc tài khoản của bạn không đúng"? <p className="err">{handle.errdn}</p>:""}
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" value={password} onChange={(e) => pwchang(e.target.value)} required />
                            <label >Password</label>
                            { handle.errdn=="mật khẩu hoặc tài khoản của bạn không đúng"? <p className="err">{handle.errdn}</p>:""}
                        </div>
                      
                        <div className="remember-forgot">
                            <label ><input type="checkbox" />
                                Nhớ mật khẩu
                            </label>
                            <a href="#my-dialog">Quên mật khẩu?</a>
                        </div>
                        <button type="submit" className="btn" >Đăng nhập</button>
                        <div className="login-register">
                            <p>Không có tài khoản?
                                <a onClick={handlech} href="#my-dialog" className="register-link">
                                    Đăng Ký
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="form-box Register">
                    <h2>Đăng Ký</h2>
                    <form onSubmit={handleregister}>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input type="text" value={username} onChange={(e) => uschang(e.target.value)} required />
                            <label >Username</label>
                            { handle.errdn=="Username của bạn đã tồn tại"? <p className="err">{handle.errdn}</p>:""}
                        </div>
                        
                        <div className="input-box">
                            <span className="icon">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" value={password} onChange={(e) => pwchang(e.target.value)} required />
                            <label >Password</label>
                            { handle.errdn=="Mật khẩu nhập lại không khớp"? <p className="err">{handle.errdn}</p>:""}
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" value={testpass} onChange={(e) => testpw(e.target.value)} required />
                            <label >nhập lại Password</label>
                            { handle.errdn=="Mật khẩu nhập lại không khớp"? <p className="err">{handle.errdn}</p>:""}
                        </div>
                        
                        <button type="submit" className="btn" >Đăng Ký</button>
                        <div className="login-register">
                            <p>Sản sàng đăng nhập
                                <a onClick={handlech} className="login-link">
                                    Đăng nhập
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login