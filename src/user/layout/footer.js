import { Link } from "react-router-dom"
const Footer=()=>{
    return(
        <footer>
            <div className="contaỉnterft">
                    <div className="row">
                        <div className="footer-col">
                            <h4>công Ty</h4>
                            <ul>
                                <li><Link className="aft">về chúng tôi</Link> </li>
                                <li><Link className="aft">Dịch vụ của chúng tôi</Link> </li>
                                <li><Link className="aft">Chính sách bảo mật</Link> </li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>trợ giúp</h4>
                            <ul>
                                <li><Link className="aft">FAQ</Link> </li>
                                <li><Link className="aft">Vận chuyển</Link> </li>
                                <li><Link className="aft">Giải đáp</Link> </li>
                                <li><Link className="aft">Hình thức thanh toán</Link> </li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Online shop</h4>
                            <ul>
                                <li><Link className="aft">Xem</Link> </li>
                                <li><Link className="aft">Dụng cụ thể thao</Link> </li>
                                <li><Link className="aft">Dụng cụ tập Gym</Link> </li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Theo Dõi Chúng tôi</h4>
                            <div className="social-links">
                                <Link className=" aft"><i className="fab fa-facebook"></i></Link>
                                <Link className=" aft"><i className="fab fa-twitter"></i></Link>
                                <Link className=" aft"><i className="fab fa-instagram"></i></Link>
                                <Link className=" aft"><i className="fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                    </div>
            </div>
        </footer>
    )
}
export default Footer