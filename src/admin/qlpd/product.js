import { useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Headerad from './../layout/header'
import Navadmin from './../layout/nav'
import Swal from 'sweetalert2'
const Product = () => {
    const [Products, getproducts] = useState([])
    const [Types, getType] = useState([])
    const navigate = useNavigate()
    const [Tilte, Titlechang] = useState("")
    const [Price, Pricechang] = useState("")
    const [tenloai, loaichang] = useState("")
    const [Kho, Khochang] = useState("")
    const [ifm, ifmchang] = useState("")
    const [image, imagechang] = useState(null)
    
    const sess = sessionStorage.getItem('admin')
    const [Params] = useSearchParams()
    const search = Object.fromEntries([...Params])
    const hanledelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắc không',
            text: "Bạn muốn xóa sản phẩm này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa sản phẩm'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete("http://localhost:5000/api/products/" + id, {
                    headers: {
                        'Authorization': `Bearer ${sess}`,

                    },
                })
                    .then((res) => {
                        getproducts(res.data.products)
                        Swal.fire({
                            icon: 'success',
                            title: 'Thành công',
                            text: 'Xóa Sản phẩm thành công',

                        })
                    }).catch(error => {
                        if (error.response.status == 401) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Thất bại',
                                text: 'Xóa Sản phẩm thất bại',

                            })
                        } else {
                            console.log(error)
                        }
                    })
            } 
        })

    }
    const editproduct = (id) => {
        navigate(`/admin/editpd/${id}`)

    }
    function handleImage(e) {
       
        const imagepd = e.target.files[0]
        imagechang(imagepd)


    }
  
    const handlesubmit = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Authorization': `Bearer ${sess}`,
                'Content-Type': 'multipart/form-data'
            },
        }
        axios.post("http://localhost:5000/api/products/", {
            Tilte: Tilte,
            Price: Price,
            tenloai: tenloai,
            image: image,
            Kho: Kho,
            ifm: ifm
        }, config)
            .then((res) => {
                console.log(res)
                imagechang(null)
                Titlechang("")
                Pricechang("")
                loaichang("")
                Khochang("")
                ifmchang("")
                getproducts(res.data.Pd)
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Thêm Sản phẩm thành công',

                })
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Tên sản phẩm đã tồn tại',

                    })
                } else {
                    console.log(error)
                }
            })
            
    }
    useEffect(() => {
        async function getProducts() {
            if (!search.searchpd) {
                const res = await axios.get('http://localhost:5000/api/products/')
                getproducts(res.data.products);
            } else {
                const res = await axios.get("http://localhost:5000/search/search=" + search.searchpd)
                getproducts(res.data.Search)
            }

        }
        async function gettypes() {
            const res = await axios.get("http://localhost:5000/api/type/")
            getType(res.data.types)
        }

        gettypes()
        getProducts()

    }, [])




    return (<div className="bodyadmin">
        <div className="container">
            <Headerad />
            <div className="main">
                <Navadmin />
                <div className="fproduct">
                    <h2>Thêm sản phẩm</h2>
                    <form className="productform" onSubmit={handlesubmit} >
                        <div className="input-form ">
                            <label >Tên sản phẩm</label>
                            <input type="text" value={Tilte} onChange={e => Titlechang(e.target.value)} placeholder="nhập tên sản phẩm" />

                        </div>
                        <div className="input-form ">
                            <label >Loại sản phẩm</label>
                            <div className="select-box">
                                <select value={tenloai} onChange={e => loaichang(e.target.value)} >
                                    <option >lựa chọn loại</option>
                                    {
                                        Types.map(item => {
                                            return (
                                                <option key={item._id} value={item.ten_loai}>
                                                    {item.ten_loai}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <div className="input-form ">
                            <label >Hình ảnh</label>
                            <input type="file" onChange={handleImage} placeholder="nhập tên sản phẩm" name="image" />
                        </div>
                       
                        <div className="column">
                            <div className="input-form ">
                                <label >Giá</label>
                                <input type="number" value={Price} onChange={e => Pricechang(e.target.value)} placeholder="nhập  giá" required />
                            </div>
                            <div className="input-form ">
                                <label >Kho</label>
                                <input type="number" value={Kho} onChange={e => Khochang(e.target.value)} placeholder="nhập kho" required />
                            </div>
                        </div>


                        <div className="input-form ">
                            <label >Thông tin sản phẩm</label>
                            <textarea value={ifm} onChange={e => ifmchang(e.target.value)} id="" placeholder="nhập thông tin sản phẩm"></textarea>
                        </div>
                        <button>Thêm sản phẩm</button>
                    </form>
                    <div className="tables">
                        <div className="lasttable">
                            <div className="heading">
                                <h2>Tìm sản phẩm</h2>
                                <form className="searchp" method="get">
                                    <input type="text" name="searchpd" placeholder="Tìm kiếm tại đây" />
                                    <label htmlFor="search"><i className="fas fa-search"></i></label>
                                </form>
                            </div>
                            <table className="dspd">
                                <thead>
                                    <tr>
                                        <td>Tên sản phẩm</td>
                                        <td>Loại</td>
                                        <td>Kho</td>
                                        <td>Hình ảnh</td>
                                        <td>Giá</td>
                                        <td>ifm</td>
                                        <td></td>
                                        <td></td>
                                    </tr>

                                </thead>
                                <tbody>
                                    {
                                        Products.map(item => {
                                            return (
                                                <tr key={item._id}>
                                                    <td>{item.Tilte}</td>
                                                    <td>{
                                                        Types.map(type => {
                                                            if (item.ID_loai == type._id) {
                                                                return type.ten_loai
                                                            }

                                                        })

                                                    }</td>

                                                    <td>{item.Kho}

                                                    </td>
                                                    <td><img src={"http://localhost:5000/img/" + item.Image} /></td>
                                                    <td>{item.Price.toLocaleString()} VND</td>
                                                    <td>{item.Ifm}</td>
                                                    <td><a onClick={() => { editproduct(item._id) }} ><i className="far fa-edit"></i></a></td>
                                                    <td><a onClick={() => hanledelete(item._id)}>
                                                        <i className="far fa-trash-alt"></i></a></td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Product