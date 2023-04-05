import { createContext, useState } from "react";
const Provilogin=createContext()
function Uselogin({children}){
    const [hidden,seth]=useState("")
    const [dk,setdk]=useState("")
    const [errdn,geterrdn]=useState("")
    const [countpage,setcountpage]=useState(1)
    const [getpage,getcountpage]=useState(1)
    const [lk,getlk]=useState(false)
   
    const handledn=()=>{
        const con=hidden===""?"active-popup":""
        geterrdn("")
        seth(con)
    }
    const hlsetdk=()=>{
        const active=dk===""?"active":""
        setdk(active)
        
    }
    const value ={
        hidden,
        handledn,
        dk,
        hlsetdk,
        errdn,
        geterrdn,
        countpage,
        setcountpage,
        getpage,
        getcountpage,
        lk,
        getlk
    }
    return (
        <Provilogin.Provider value={value}>
            {children}
        </Provilogin.Provider>
    )
}
export  {Provilogin, Uselogin}