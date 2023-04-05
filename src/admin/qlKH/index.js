import Headerad from '../layout/header'
import Navadmin from '../layout/nav'
import React, { Suspense } from 'react';
const MainKH= React.lazy(()=>import('./main'))
const QLKH = () => {

    return (
        <div className="bodyadmin">
        
            <div className="container">
            
                <Headerad />
                <div className="main">
                
                    <Navadmin /> 
                   
                   <Suspense fallback={<span className="loader"></span>}>
                  
                   <MainKH/>
                   
                   </Suspense>
                   
                </div>
            </div>
        </div>
    );
}
export default QLKH