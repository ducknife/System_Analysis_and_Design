import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { money, services } from '../data'

export default function SearchService() {
  return (
    <Layout title="Chọn dịch vụ">
      <div className="card">
        <h2>Tìm dịch vụ</h2>
        <div className="row">
          <div style={{ flex: 3 }}>
            <label>Từ khóa tên dịch vụ</label>
            <input id="txtServiceKeyword" defaultValue="thay" />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </div>

        <table id="tblService">
          <thead>
            <tr>
              <th>Mã DV</th>
              <th>Tên dịch vụ</th>
              <th className="num">Định mức công</th>
              <th className="num">Đơn giá</th>
              <th style={{ width: 90 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.serviceID}>
                <td>{s.serviceID}</td>
                <td>{s.name}</td>
                <td className="num">{s.laborContent.toFixed(1)}</td>
                <td className="num">{money(s.price)}</td>
                <td>
                  <button className="btn sm">Chọn</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/service-slip">
            Quay lại phiếu dịch vụ
          </Link>
        </div>
      </div>
    </Layout>
  )
}
