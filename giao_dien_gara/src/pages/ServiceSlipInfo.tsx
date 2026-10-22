import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { cars, componentDetails, customer, money, serviceDetails } from '../data'

export default function ServiceSlipInfo() {
  const tienDv = serviceDetails.reduce((s, d) => s + d.price, 0)
  const tienPt = componentDetails.reduce((s, d) => s + d.qty * d.price, 0)
  return (
    <Layout title="Phiếu dịch vụ">
      <div className="card">
        <h2>Phiếu dịch vụ PDV000101</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ width: 150 }}>Khách hàng</th>
              <td>{customer.fullname}</td>
              <th style={{ width: 130 }}>Điện thoại</th>
              <td>{customer.phone}</td>
            </tr>
            <tr>
              <th>Xe tiếp nhận</th>
              <td>
                {cars[0].licensePlate} &mdash; {cars[0].brand} {cars[0].model}
              </td>
              <th>Thời gian</th>
              <td>21/10/2026 08:45</td>
            </tr>
          </tbody>
        </table>

        <h3>Dịch vụ đã chọn</h3>
        <table id="tblServiceDetail">
          <thead>
            <tr>
              <th>Mã DV</th>
              <th>Tên dịch vụ</th>
              <th className="num">Định mức công</th>
              <th className="num">Đơn giá</th>
              <th style={{ width: 70 }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {serviceDetails.map((d) => (
              <tr key={d.serviceID}>
                <td>{d.serviceID}</td>
                <td>{d.name}</td>
                <td className="num">{d.laborContent.toFixed(1)}</td>
                <td className="num">{money(d.price)}</td>
                <td>
                  <button className="btn sm ghost">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Phụ tùng đã chọn</h3>
        <table id="tblComponentDetail">
          <thead>
            <tr>
              <th>Mã PT</th>
              <th>Tên phụ tùng</th>
              <th className="num">Số lượng</th>
              <th className="num">Đơn giá</th>
              <th className="num">Thành tiền</th>
              <th style={{ width: 70 }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {componentDetails.map((d) => (
              <tr key={d.componentID}>
                <td>{d.componentID}</td>
                <td>{d.name}</td>
                <td className="num">{d.qty}</td>
                <td className="num">{money(d.price)}</td>
                <td className="num">{money(d.qty * d.price)}</td>
                <td>
                  <button className="btn sm ghost">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng chi phí tạm tính: <b>{money(tienDv + tienPt)}</b>
        </div>

        <div className="actions">
          <Link className="btn" id="btnAddService" to="/search-service">
            Thêm dịch vụ
          </Link>
          <Link className="btn" id="btnAddComponent" to="/add-component">
            Thêm phụ tùng
          </Link>
          <Link className="btn ghost" id="btnSave" to="/manager-home">
            Lưu phiếu
          </Link>
        </div>
      </div>
    </Layout>
  )
}
