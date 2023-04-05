import Headerad from '../layout/header'
import Navadmin from '../layout/nav'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Swal from 'sweetalert2'
const QLXBL = () => {
    const id = useParams()
    const [BL, getBL] = useState([])
    const sess = sessionStorage.getItem('admin')
    useEffect(() => {
        async function Getbill() {
            const res = await axios.get("http://localhost:5000/api/comments/" + id.id)
            const l = []
            getBL(res.data.comments)
        }

        Getbill()


    }, [])
    function hanledelete(id) {
        const config = {
            headers: {
                'Authorization': `Bearer ${sess}`,

            },
        }
      
        Swal.fire({
            title: 'Bạn có chắc chắc không',
            text: "Bạn muốn xóa Bình luận  này",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xóa Bình luận'
        }).then(choose=>{
            if(choose.isConfirmed){
                axios.delete("http://localhost:5000/api/comments/Admin/" + id, config).then(res => {
                    console.log(res.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Xóa bình luận thành công',
                   
                  }).then(ressul=>{
                      if(ressul.isConfirmed){
                        getBL(res.data.cm)
                      }
                  })
                
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Xóa bình luận thất bại',
                   
                  })
            })

            }
        })

            

        }
    return (
            <div className="bodyadmin">
                <div className="container">
                    <Headerad />
                    <div className="main">
                        <Navadmin />
                        <div className="ftype">
                            <div className="tables">
                                <div className="lasttable">
                                    <div className="back-t">
                                        <Link to="../admin/BL"><i className="fas fa-arrow-left"></i></Link>
                                    </div>
                                    <table className="dspd">
                                        <thead>
                                            <tr>
                                                <td>Tên Sản phẩm</td>
                                                <td>  Nội dung Bình luận</td>
                                                <td>Ngày bình luận</td>
                                                <td> Xóa bình luận</td>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                BL.map((item) => {
                                                    return (
                                                        <tr key={item._id}>
                                                            <td>{item.Tilte}</td>
                                                            <td>{item.Post_cm}</td>
                                                            <td> {new Date(item.Date_post).getDate() + "/" +
                                                                `${new Date(item.Date_post).getMonth() + 1}` + "/" +
                                                                new Date(item.Date_post).getFullYear()
                                                            }</td>
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
        );
    }
    export default QLXBL