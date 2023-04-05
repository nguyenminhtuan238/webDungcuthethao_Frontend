import { useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import {Provilogin} from "./../uselogin"
const  Pagination=()=>{
    const handle=useContext(Provilogin)
    const [page,getpage]=useState([])
    useEffect(()=>{
        const p=[]
        for(let i=1;i<=handle.countpage;i++){
            p.push(i)
            getpage(p)
        }
    },[handle.countpage])
    return(
        <div className="Pagination">
            <section>
                <ul className="page">
                    <Link to="#" className="a" 
                    onClick={()=>handle.getcountpage(handle.getpage>1?handle.getpage-1:1)}>
                    <li><i className="fas fa-chevron-left"></i></li>
                    </Link>
                    <Link to="#" className="a " 
                    onClick={()=>handle.getcountpage(handle.getpage==handle.countpage?handle.countpage:handle.getpage+1)}>
                    <li><i className="fas fa-chevron-right"></i></li>
                    </Link>
                     {
                        page.map((item,index)=>{
                            return(
                                
                                <Link to="#" className={item==handle.getpage?"a activepage":"a"} onClick={()=>handle.getcountpage(item)} key={index}>
                                <li>{item}</li>
                                </Link>
                            )
                        })
                     }             
                </ul>
            </section>
        </div>
    )
}
export default Pagination