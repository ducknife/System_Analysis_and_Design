import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { money, salaryRows } from '../data'

export default function ConfirmReceived() {
  return (
    <Layout title="Xác nhận đã nhận lương">
      <div className="card">
        <h2>Xác nhận nhân viên đã nhận lương tháng 10/2026</h2>

        <table id="tblSalaryTable">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th className="num">Thành tiền</th>
              <th>Hình thức</th>
              <th style={{ width: 120 }}>Đã nhận</th>
            </tr>
          </thead>
          <tbody>
            {salaryRows.map((r, i) => (
              <tr key={r.userID}>
                <td>{r.employeeCode}</td>
                <td>{r.fullname}</td>
                <td className="num">{money(r.amount)}</td>
                <td>Chuyển khoản</td>
                <td>
                  <input type="checkbox" defaultChecked={i === 0} style={{ width: 16 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn" id="btnConfirm" to="/manager-home">
            Xác nhận và kết thúc
          </Link>
          <Link className="btn ghost" id="btnBack" to="/choose-method">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
