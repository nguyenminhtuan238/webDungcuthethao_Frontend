import Headerad from '../layout/header'
import Navadmin from '../layout/nav'
import { Chart } from "react-google-charts";
import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
const QLHD = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [bill, getbill] = useState([])
    const [date, setdate] = useState(false)
    const [month, setMonth] = useState(false)
    const [year, setyear] = useState(false)
   
    useEffect(() => {
        async function Getbill() {
            const Status = []
            const res = await axios.get("http://localhost:5000/api/order/", {
            })
            res.data.orders.map(item => {
                if (item.status) {
                    Status.push({ ...item, createAt: new Date(item.createAt) })
                    getbill(Status)
                }
                return item
            })

        }
        Getbill()
    }, [])
    const searchdate = async () => {
        setdate(true)
        setMonth(false)
        setyear(false)
        const Status = []
        const res = await axios.get("http://localhost:5000/api/order/", {
        })
        res.data.orders.map(item => {
            if (item.status) {

                if (
                    startDate.getFullYear() == new Date(item.createAt).getFullYear() &&
                    startDate.getMonth() == new Date(item.createAt).getMonth() &&
                    startDate.getDate() == new Date(item.createAt).getDate()
                ) {
                    Status.push({ ...item, createAt: new Date(item.createAt) })
                    getbill(Status)
                } else {
                    getbill(Status)
                }


            }
            return item
        })
    }
    const searchMonth = async () => {
        setdate(false)
        setMonth(true)
        setyear(false)
        const Status = []
        const res = await axios.get("http://localhost:5000/api/order/", {
        })
        res.data.orders.map(item => {
            if (item.status) {
                if (
                    startDate.getFullYear() == new Date(item.createAt).getFullYear() &&
                    startDate.getMonth() == new Date(item.createAt).getMonth()
                ) {
                    Status.push({ ...item, createAt: new Date(item.createAt) })
                    getbill(Status)
                } else {
                    getbill(Status)
                }

            }
            return item
        })
    }
    const searchYear = async () => {
        setdate(false)
        setMonth(false)
        setyear(true)
        const Status = []
        const res = await axios.get("http://localhost:5000/api/order/", {
        })
        res.data.orders.map(item => {
            if (item.status) {
                if (
                    startDate.getFullYear() == new Date(item.createAt).getFullYear()
                ) {
                    Status.push({ ...item, createAt: new Date(item.createAt) })
                    getbill(Status)
                } else {
                    getbill(Status)
                }

            }
            return item
        })
    }
    const searchAll = async () => {
        setdate(false)
        setMonth(false)
        setyear(false)
        const Status = []
        const res = await axios.get("http://localhost:5000/api/order/", {
        })
        res.data.orders.map(item => {
            if (item.status) {
                Status.push({ ...item, createAt: new Date(item.createAt) })
                getbill(Status)
            }
            return item
        })
    }
    const handledate = async (e) => {
        e.preventDefault()
        const Status = []

        const res = await axios.get("http://localhost:5000/api/order/", {
        })
        res.data.orders.map(item => {
            if (item.status) {
                if (date) {
                    if (
                        startDate.getFullYear() == new Date(item.createAt).getFullYear() &&
                        startDate.getMonth() == new Date(item.createAt).getMonth() &&
                        startDate.getDate() == new Date(item.createAt).getDate()
                    ) {
                        Status.push({ ...item, createAt: new Date(item.createAt) })
                        getbill(Status)
                    } else {
                        getbill(Status)
                    }
                }
                if (month) {
                    if (
                        startDate.getFullYear() == new Date(item.createAt).getFullYear() &&
                        startDate.getMonth() == new Date(item.createAt).getMonth()
                    ) {
                        Status.push({ ...item, createAt: new Date(item.createAt) })
                        getbill(Status)
                    } else {
                        getbill(Status)
                    }
                }
                if (year) {
                    if (
                        startDate.getFullYear() == new Date(item.createAt).getFullYear()
                    ) {
                        Status.push({ ...item, createAt: new Date(item.createAt) })
                        getbill(Status)
                    } else {
                        getbill(Status)
                    }
                }
            }
            return item
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
                                <div className="search-date" >
                                    {
                                        date ? <form className="form-date">
                                            <DatePicker showIcon
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                className="date"
                                            />
                                            <button className="bnt-TK" onClick={(e) => handledate(e)}>Tìm kiếm </button>

                                        </form>
                                            : ""
                                    }
                                    {
                                        month ? <form className="form-date">
                                            <DatePicker showIcon
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                className="date"
                                                dateFormat="MM/yyyy"
                                                showMonthYearPicker
                                            />
                                            <button className="bnt-TK" onClick={(e) => handledate(e)}>Tìm kiếm </button>

                                        </form>
                                            : ""
                                    }
                                    {
                                        year ? <form className="form-date">
                                            <DatePicker showIcon
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                className="date"
                                                dateFormat="yyyy"
                                                showYearPicker
                                            />
                                            <button className="bnt-TK" onClick={(e) => handledate(e)}>Tìm kiếm </button>

                                        </form>
                                            : ""
                                    }
                                </div>
                                <div className="search-date-button">
                                    <button className="bnt-TK" onClick={() => searchdate()}>Tìm kiếm theo Ngày </button>
                                    <button className="bnt-TK" onClick={() => searchMonth()}>Tìm kiếm theo tháng</button>
                                    <button className="bnt-TK" onClick={() => searchYear()}>Tìm kiếm theo Năm</button>
                                    <button className="bnt-TK" onClick={() => searchAll()}>tất cả</button>
                                </div>
                                {date ? <h1 className="title-search">
                                    {startDate.getDate() + "/" +
                                        `${startDate.getMonth() + 1}` +
                                        "/" + startDate.getFullYear()}
                                </h1> : ""}
                                {month ? <h1 className="title-search">
                                    {
                                        `${startDate.getMonth() + 1}` +
                                        "/" + startDate.getFullYear()}
                                </h1> : ""}
                                {year ? <h1 className="title-search">
                                    {
                                        startDate.getFullYear()}
                                </h1> : ""}
                                <table className="dspd">

                                    <thead>
                                        <tr>
                                            <td>Tên Khách hàng</td>
                                            <td>tổng Đơn Hàng</td>
                                            <td>Ngày Mua</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bill.map(item => {
                                                return (
                                                    <tr key={item._id}>
                                                        <td>{item.Name}</td>
                                                        <td>{item.totalBill.toLocaleString()} VND</td>
                                                        <td>{item.createAt.getDate() + "/" + `${item.createAt.getMonth() + 1}` + "/" + item.createAt.getFullYear()}</td>
                                                    </tr>
                                                )
                                            })

                                        }
                                        <tr>
                                            <td>tổng tiền của tất cả Hóa Đơn</td>
                                            <td>{bill.reduce((a, b) => a + b.totalBill, 0).toLocaleString()} VND</td>
                                        </tr>
                                        {/* <tr>
                                            <td colSpan="3">
                                                <Chart
                                                    chartType="Bar"
                                                    data={data}
                                                    options={options}
                                                    width="80%"
                                                    height="400px"
                                                    legendToggle
                                                />
                                            </td>
                                        </tr> */}
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
export default QLHD