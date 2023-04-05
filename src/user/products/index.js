import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Provilogin } from "./../uselogin"
const Products = ({}) => {
    const [pds, getpd] = useState([])
    const [types, getType] = useState([])
    const handle = useContext(Provilogin)
    function hanlecart(id) {
        axios.get("http://localhost:5000/api/products/" + id)
            .then(res => {
                const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
                const localc = JSON.parse(localStorage.getItem("cart"))
                if (localc) {
                    const ex = localc.find((e) => e.id === id)
                    if (ex) {
                        localc.map((item, index) => {
                            if (item.id === id) {
                                const objectpd = {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                                localc[index] = objectpd
                                localStorage.setItem("cart", JSON.stringify(localc))
                            }
                            return 1
                        })
                    } else {
                        const objectpd = {
                            id: res.data.products._id,
                            Tilte: res.data.products.Tilte,
                            image: res.data.products.Image,
                            Price: res.data.products.Price,
                            quantity: 1
                        }
                        localc.push(objectpd)
                        localStorage.setItem("cart", JSON.stringify(localc))
                    }


                } else {
                    const objectpd = {
                        id: res.data.products._id,
                        Tilte: res.data.products.Tilte,
                        image: res.data.products.Image,
                        Price: res.data.products.Price,
                        quantity: 1
                    }
                    cart.push(objectpd)
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
                handle.getlk(!handle.lk)
            })
            .catch(err => {
                console.log(err)
            })
           
    }
    function hanlebuy(id) {
        axios.get("http://localhost:5000/api/products/" + id)
            .then(res => {
                const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
                const localc = JSON.parse(localStorage.getItem("cart"))
                if (localc) {
                    const ex = localc.find((e) => e.id === id)
                    if (ex) {
                        localc.map((item, index) => {
                            if (item.id === id) {
                                const objectpd = {
                                    ...item,
                                    quantity: item.quantity + 1
                                }
                                localc[index] = objectpd
                                localStorage.setItem("cart", JSON.stringify(localc))
                            }
                            return 1
                        })
                    } else {
                        const objectpd = {
                            id: res.data.products._id,
                            Tilte: res.data.products.Tilte,
                            image: res.data.products.Image,
                            Price: res.data.products.Price,
                            quantity: 1
                        }
                        localc.push(objectpd)
                        localStorage.setItem("cart", JSON.stringify(localc))
                    }


                } else {
                    const objectpd = {
                        id: res.data.products._id,
                        Tilte: res.data.products.Tilte,
                        image: res.data.products.Image,
                        Price: res.data.products.Price,
                        quantity: 1
                    }
                    cart.push(objectpd)
                    localStorage.setItem("cart", JSON.stringify(cart))
                }
                handle.getlk(!handle.lk)
            })
            .catch(err => {
                console.log(err)
            })
           
    }
    useEffect(() => {
        async function Getpds() {
            const res = await axios.get("http://localhost:5000/api/products/")
            handle.setcountpage(Math.ceil(res.data.products.length / 6))
            getpd(res.data.products)

        }
        async function GetTypes() {
            const resT = await axios.get("http://localhost:5000/api/type/")
            getType(resT.data.types)
        }

        Getpds()
        GetTypes()
    }, [])
    useEffect(() => {
        async function Getpds() {
            const res = await axios.get("http://localhost:5000/api/products?page=" + handle.getpage)
            getpd(res.data.products)

        }
        Getpds()
    }, [handle.getpage])
    return (
        <div className="products">
            <div className="containertc">
                <div className="product-item">
                
                    {
                        
                            pds.map(item => {
                                return (
                                    <div className="product" key={item._id}>
                                        <div className="product-content"  >
                                            <div className="product-img">
                                                <img src={"http://localhost:5000/img/" + item.Image} alt="Hình ảnh sản phẩm"  />
                                            </div>
                                               
                                        </div>

                                        <div className="product-info">
                                            <h2 className="sm-title">
                                                {
                                                    types.map(type => {
                                                        if (item.ID_loai === type._id) {
                                                            return type.ten_loai
                                                        }
                                                    })
                                                }
                                            </h2>
                                            <Link to={"detail/" + item._id} className="product-name">{item.Tilte}</Link>
                                            <p className="product-price">{item.Price.toLocaleString()} VND</p>
                                        </div>
                                        <div className="product-btn">
                                                    <Link type="button" className="btn-cart" onClick={() => hanlecart(item._id)}>
                                                        thêm vào giỏ hàng
                                                        <span><i className="fas fa-plus"></i></span>
                                                    </Link>
                                                    <button type="button" className="btn-buy"  onClick={() => hanlebuy(item._id)}>
                                                        Mua
                                                        <span>
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </span>
                                                    </button>
                                            </div>
                                    </div>
                                )
                            })
                          
                    }
                    {   
                       
                        
                    }
                </div>
            </div>
          
 
        </div>
    )
}
export default Products