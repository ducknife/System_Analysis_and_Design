import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { waitingSlips } from '../data'

export default function SearchNeededServiceSlip() {
  return (
    <Layout title="Phân công nhân viên">
      <div className="card">
        <h2>Phiếu dịch vụ chờ phân công</h2>
        <div className="row">
          <div style={{ flex: 3 }}>
            <label>Từ khóa biển số hoặc tên khách hàng</label>
            <input id="txtSlipKeyword" defaultValue="" placeholder="Để trống để xem tất cả" />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </div>

        <table id="tblServiceSlip">
          <thead>
            <tr>
              <th>Mã phiếu</th>
              <th>Biển số</th>
              <th>Khách hàng</th>
              <th>Thời gian tiếp nhận</th>
              <th>Trạng thái</th>
              <th style={{ width: 110 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {waitingSlips.map((s) => (
              <tr key={s.serviceSlipID}>
                <td>{s.serviceSlipID}</td>
                <td>{s.licensePlate}</td>
                <td>{s.customer}</td>
                <td>{s.time}</td>
                <td>
                  <span className="tag wait">{s.status}</span>
                </td>
                <td>
                  <Link className="btn sm" to="/staff-list">
                    Phân công
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
