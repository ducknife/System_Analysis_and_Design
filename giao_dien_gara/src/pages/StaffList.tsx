import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { serviceDetails, staffs } from '../data'

export default function StaffList() {
  return (
    <Layout title="Chọn nhân viên phục vụ">
      <div className="card">
        <h2>Phân công cho phiếu PDV000101 &mdash; 30A-123.45</h2>

        <h3>Dòng dịch vụ cần phân công</h3>
        <table id="tblServiceDetail">
          <thead>
            <tr>
              <th>Mã DV</th>
              <th>Tên dịch vụ</th>
              <th className="num">Định mức công</th>
              <th style={{ width: 230 }}>Nhân viên phục vụ</th>
            </tr>
          </thead>
          <tbody>
            {serviceDetails.map((d) => (
              <tr key={d.serviceID}>
                <td>{d.serviceID}</td>
                <td>{d.name}</td>
                <td className="num">{d.laborContent.toFixed(1)}</td>
                <td>
                  <select defaultValue="">
                    <option value="">-- Chọn nhân viên --</option>
                    {staffs
                      .filter((s) => !s.busy)
                      .map((s) => (
                        <option key={s.userID} value={s.userID}>
                          {s.employeeCode} &mdash; {s.fullname}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Danh sách nhân viên</h3>
        <table id="tblStaff">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th>Chuyên môn</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((s) => (
              <tr key={s.userID}>
                <td>{s.employeeCode}</td>
                <td>{s.fullname}</td>
                <td>{s.specialization}</td>
                <td>
                  {s.busy ? (
                    <span className="tag busy">Đang bận</span>
                  ) : (
                    <span className="tag ok">Sẵn sàng</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn" id="btnNext" to="/choose-slot">
            Tiếp tục chọn khoang sửa
          </Link>
          <Link className="btn ghost" id="btnBack" to="/search-needed-slip">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
