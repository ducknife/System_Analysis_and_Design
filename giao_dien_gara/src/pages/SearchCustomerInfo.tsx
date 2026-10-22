import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { appointments, cars, customer } from '../data'

export default function SearchCustomerInfo() {
  return (
    <Layout title="Tiếp nhận xe">
      <div className="card">
        <h2>Tra cứu khách hàng</h2>
        <div className="row">
          <div style={{ flex: 3 }}>
            <label>Số điện thoại khách hàng</label>
            <input id="txtPhoneSearch" defaultValue="0912345678" />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </div>

        <h3>Thông tin khách hàng</h3>
        <table>
          <tbody>
            <tr>
              <th style={{ width: 160 }}>Họ và tên</th>
              <td>{customer.fullname}</td>
              <th style={{ width: 120 }}>Điện thoại</th>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{customer.email}</td>
              <th>Địa chỉ</th>
              <td>{customer.address}</td>
            </tr>
          </tbody>
        </table>

        <h3>Danh sách xe của khách</h3>
        <table id="tblCar">
          <thead>
            <tr>
              <th>Mã xe</th>
              <th>Biển số</th>
              <th>Hãng</th>
              <th>Dòng xe</th>
              <th className="num">Năm SX</th>
              <th style={{ width: 110 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((c) => (
              <tr key={c.carID}>
                <td>{c.carID}</td>
                <td>{c.licensePlate}</td>
                <td>{c.brand}</td>
                <td>{c.model}</td>
                <td className="num">{c.year}</td>
                <td>
                  <Link className="btn sm" to="/service-slip">
                    Tiếp nhận
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Lịch hẹn đã đặt</h3>
        <table id="tblAppointment">
          <thead>
            <tr>
              <th>Mã lịch hẹn</th>
              <th>Thời gian hẹn</th>
              <th>Biển số</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.appointmentID}>
                <td>{a.appointmentID}</td>
                <td>{a.time}</td>
                <td>{a.licensePlate}</td>
                <td>
                  <span className="tag ok">{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn" id="btnAddCustomer" to="/add-customer">
            Thêm khách hàng mới
          </Link>
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
