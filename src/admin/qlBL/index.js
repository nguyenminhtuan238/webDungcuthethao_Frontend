import React, { Suspense } from 'react'
import Headerad from '../layout/header'
import Navadmin from '../layout/nav'
const MainBL= React.lazy(()=>import('./main'))
const QLBL = () => {
   
    return (
        <div className="bodyadmin">
            <div className="container">
                <Headerad />
                <div className="main">
                    <Navadmin />
                   
                    <Suspense fallback={<span className="loader"></span>}>
                  
                  <MainBL/>
                  
                  </Suspense>
                </div>
            </div>
        </div>
    );
}
export default QLBL