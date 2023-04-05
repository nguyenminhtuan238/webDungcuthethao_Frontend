import { memo } from 'react';
import { Link } from 'react-router-dom';

const headeradmin=()=>{
    const logout=()=>{
        sessionStorage.removeItem('admin')
    }
    return(
        <div className="sidebar">
        <ul>
            <li>
                <Link to="/admin">
                    <i className="fas fa-clinic-medical"></i>
                    <div className="title">Admin</div>
                </Link>
            </li>
            <li>
                <Link to="/admin/product" className="qlsp" >
                    <i className="fab fa-product-hunt"></i>
                    <div className="title">Quản lí sản phẩm</div>
                </Link>
            </li>
            <li>
               
                    <Link to="/admin/type" className="qll"> 
                    <i className="fab fa-skype"></i>
                    <div className="title">Quản lí loại</div>
                    </Link>
                    
                
            </li>
            <li>
                <Link  to="/admin/KH">
                    <i className="fas fa-user"></i>
                    <div className="title">Quản lý Khách hàng</div>
                </Link>
            </li>
            <li>
                <Link to="/admin/HD" >
                    <i className="far fa-money-bill-alt"></i>
                    <div className="title">Quản lý hóa đơn</div>
                </Link>
            </li>
            <li>
                <Link to="/admin/BL">
                    <i className="fas fa-comment"></i>
                    <div className="title">Quản lý bình luận</div>
                </Link>
            </li>
            <li>
                <Link to="/admin/DH">
                    <i className="fab fa-jedi-order"></i>
                    <div className="title">Quản lý Đơn hàng</div>
                </Link>
            </li>
            <li>
                <Link to="/admin/Kho">
                    <i className="fab fa-jedi-order"></i>
                    <div className="title">Quản lý Kho</div>
                </Link>
            </li>
            <li>
                <Link onClick={()=>logout()} to=".." >
                    <i className="fas fa-sign-out-alt"></i>
                    <div   className="title">Đăng xuất</div>
                </Link>
            </li>
        </ul>
    </div>
    )
}
export default memo( headeradmin)