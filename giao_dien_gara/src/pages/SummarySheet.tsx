import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { LABOR_UNIT_PRICE, money, salaryRows } from '../data'

export default function SummarySheet() {
  const tong = salaryRows.reduce((s, r) => s + r.amount, 0)
  return (
    <Layout title="Bảng công tháng 10/2026">
      <div className="card">
        <h2>Bảng tổng hợp công nhân viên phục vụ &mdash; tháng 10/2026</h2>

        <table id="tblSalaryTable">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ và tên</th>
              <th className="num">Tổng công</th>
              <th className="num">Đơn giá công</th>
              <th className="num">Thành tiền</th>
              <th style={{ width: 100 }}>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {salaryRows.map((r) => (
              <tr key={r.userID}>
                <td>{r.employeeCode}</td>
                <td>{r.fullname}</td>
                <td className="num">{r.totalLabor}</td>
                <td className="num">{money(LABOR_UNIT_PRICE)}</td>
                <td className="num">{money(r.amount)}</td>
                <td>
                  <Link className="btn sm" to="/detail-sheet">
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng quỹ lương tháng: <b>{money(tong)}</b>
        </div>

        <div className="actions">
          <Link className="btn" id="btnSaveAll" to="/choose-method">
            Lưu bảng công và chọn hình thức trả
          </Link>
          <Link className="btn ghost" id="btnBack" to="/choose-month">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
