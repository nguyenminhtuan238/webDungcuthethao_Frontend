import { Suspense, useEffect, useState } from 'react';
import  axios  from 'axios';
import Swal from 'sweetalert2'
const MainKho=()=>{
    const [pd,getpd]=useState([])
    const [cm,getcm]=useState([])
    function count_array(array, x){
        let count = 0;
        for(let i=0;i<array.length;i++){
          if(array[i].ID_pd===x) 
            count ++;
        }
        return count
    }
    useEffect(()=>{
        async function GETPD(){
            const respd =await axios.get("http://localhost:5000/api/products/")
            const rescm =await axios.get("http://localhost:5000/api/comments")
            getpd(respd.data.products)
            getcm(rescm.data.comments)
        }
        GETPD()
    },[])
    const handlemax=async ()=>{
        const respd =await axios.get("http://localhost:5000/api/products/")
        for(let i=0;i<respd.data.products.length-1;i++){
            for(let j=i+1;j<respd.data.products.length;j++){
                if(respd.data.products[j].Daban>respd.data.products[i].Daban){
                   let temp=respd.data.products[i]
                   respd.data.products[i]=respd.data.products[j]
                   respd.data.products[j]=temp;
                  
                }
                
            }
           
        }
        getpd(respd.data.products)
    }
    const handlemin=async ()=>{
        const respd =await axios.get("http://localhost:5000/api/products/")
        for(let i=0;i<respd.data.products.length-1;i++){
            for(let j=i+1;j<respd.data.products.length;j++){
                if(respd.data.products[j].Daban<respd.data.products[i].Daban){
                   let temp=respd.data.products[i]
                   respd.data.products[i]=respd.data.products[j]
                   respd.data.products[j]=temp;
                  
                }
                
            }
           
        }
        getpd(respd.data.products)
    }
    const handlemaxcm=async ()=>{
        const respd =await axios.get("http://localhost:5000/api/products/")
        for(let i=0;i<respd.data.products.length-1;i++){
            for(let j=i+1;j<respd.data.products.length;j++){
                if(count_array(cm,respd.data.products[j]._id)>count_array(cm,respd.data.products[i]._id)){
                   let temp=respd.data.products[i]
                   respd.data.products[i]=respd.data.products[j]
                   respd.data.products[j]=temp;
                  
                }
                
            }
           
        }
        getpd(respd.data.products)
    }
    return(
        <div className="ftype">
        <div className="tables">
            <div className="lasttable">
                <div className="search-date">
                
                <div className="KHo">
                   
                    <button onClick={()=>handlemax()}>sản phẩm bán chạy nhất</button>
                    <button  onClick={()=>handlemin()}>sản phẩm  bán ít nhất</button>
                    <button  onClick={()=>handlemaxcm()}>sản phẩm được bình luận nhiều nhất</button>
                </div>
                
                </div>
                
                <Suspense fallback={<div className="loader-div">
                <span className="loader" ></span>
                </div>}>
                <div className="dspd">
                <table className="dspd">
                        <thead>
                            <tr>
                                <td>Tên sản phẩm</td>
                                <td>Hình ảnh</td>
                                <td>Giá</td>
                                <td>ifm</td>
                                <td>Đã Bán</td>
                                <td>Số lượt bình luận</td>
                            </tr>

                        </thead>
                        <tbody>
                        {       
                            pd.map( item =>{
                                return  (
                                <tr key={item._id}>
                                <td>{item.Tilte}</td>
                                <td><img src={"http://localhost:5000/img/"+item.Image} alt="Khống có hình"/></td>
                                <td>{item.Price.toLocaleString()} VND</td>
                                <td>{item.Ifm}</td>
                                <td>{item.Daban}
                                </td>
                                <td>{ count_array(cm,item._id)}</td>
                                </tr>
                                )
                                })
                               
                        }
                          
                        </tbody>
                    </table>
                </div>
                </Suspense>
            </div>

        </div>
    </div>
    )
}
export default MainKho