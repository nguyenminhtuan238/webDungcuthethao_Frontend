import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Admin from './admin'
import Editpd from './admin/qlpd/updatepd'
import QLLoai from './admin/qll/loai';
import Product from './admin/qlpd/product';
import Editloai from './admin/qll/editloai';
import Loginadmin from './admin/loginadmin';
import QLdh from './admin/qldh';
import Trangchu from './user';
import Detail from './user/detail';
import Search from './user/search'
import Cart from './user/cart';
import Checkout from './user/checkout';
import DH from './user/DH';
import XDH from './admin/qldh/XDH';
import HD from './user/HD';
import QLHD from './admin/qlHD';
import QLKH from './admin/qlKH';
import QLXDH from './admin/qlKH/XDHUser';
import QLBL from './admin/qlBL';
import QLXBL from './admin/qlBL/XBL';
import QLKho from './admin/qlKho';
import Notfound from './Notfound';
import Information from './user/infuser';
function App() {
  const admin=sessionStorage.getItem("admin")
  return(
    <div className="App"> 
        <BrowserRouter>
      <Routes>
          <Route path='/' element={<Trangchu/>}></Route>
          <Route path='/cart/' element={<Cart/>}></Route>
          <Route path='/DH/' element={<DH/>}></Route>
          <Route path='/DH/:id' element={<DH/>}></Route>
          <Route path='/HD/' element={<HD/>}></Route>
          <Route path='/HD/:id' element={<HD/>}></Route>
          <Route path='/user/' element={<Information/>}></Route>
          <Route path='/checkout/' element={<Checkout/>}></Route>
          <Route path='/timkiem/' element={<Search/>}></Route>
          <Route path='/detail/:pdid' element={<Detail/>}></Route> 
          <Route path='/admin' element={admin? <Admin/>:<Navigate to='/admin/login'/>}></Route> 
          <Route path='/admin/login' element={admin?<Navigate to="/admin"/>:<Loginadmin/>}></Route> 
          <Route path='/admin/product' element={admin? <Product/>:<Navigate to='/admin/login'/>}></Route>
          <Route path='/admin/editpd/:pdid' element={admin?<Editpd/>:<Navigate to='/admin/login'/>}></Route>
          <Route path='/admin/editloai/:lid' element={admin?<Editloai/>:<Navigate to='/admin/login'/>}></Route>
          <Route path='/admin/type' element={admin?<QLLoai/>:<Navigate to='/admin/login'/>}></Route> 
          <Route path='/admin/DH' element={admin?<QLdh/>:<Navigate to='/admin/login'/>}></Route> 
          <Route path='/admin/BL' element={admin?<QLBL/>:<Navigate to='/admin/login'/>}></Route>
          <Route path='/admin/BL/:id' element={admin?<QLXBL/>:<Navigate to='/admin/login'/>}></Route>  
          <Route path='/admin/XDH/:idDH' element={admin?<XDH/>:<Navigate to='/admin/login'/>}></Route> 
          <Route path='/admin/HD' element={admin?<QLHD/>:<Navigate to='/admin/login'/>}></Route>
          <Route path='/admin/KH' element={admin?<QLKH/>:<Navigate to='/admin/login'/>}></Route>  
          <Route path='/admin/Kho' element={admin?<QLKho/>:<Navigate to='/admin/login'/>}></Route>  
          <Route path='/admin/XDHuser/:id' element={admin?<QLXDH/>:<Navigate to='/admin/login'/>}></Route>
          <Route path="*" element={<Notfound/>}/>
      </Routes>
  </BrowserRouter>
    </div>
  ); 
  
}

export default App;
