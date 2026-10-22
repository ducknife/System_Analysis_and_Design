import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { money, salaryRows } from '../data'

export default function ChooseMethod() {
  return (
    <Layout title="Hình thức trả lương">
      <div className="card">
        <h2>Chọn hình thức trả lương tháng 10/2026</h2>

        <table id="tblSalaryTable">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th className="num">Thành tiền</th>
              <th style={{ width: 220 }}>Hình thức trả</th>
            </tr>
          </thead>
          <tbody>
            {salaryRows.map((r) => (
              <tr key={r.userID}>
                <td>{r.employeeCode}</td>
                <td>{r.fullname}</td>
                <td className="num">{money(r.amount)}</td>
                <td>
                  <select defaultValue="Chuyển khoản">
                    <option>Chuyển khoản</option>
                    <option>Tiền mặt</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn" id="btnSaveMethod" to="/confirm-received">
            Lưu hình thức trả
          </Link>
          <Link className="btn ghost" id="btnBack" to="/summary-sheet">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
