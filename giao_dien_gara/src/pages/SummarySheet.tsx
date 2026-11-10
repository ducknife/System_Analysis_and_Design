import { Link, useNavigate } from 'react-router-dom'
import { money } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { SalarySummary } from '../types'
import { useFetch } from '../useFetch'

export default function SummarySheet() {
  const navigate = useNavigate()
  const month = session.get('month')
  const year = session.get('year')
  const laborUnitPrice = session.get('laborUnitPrice')
  const [rows] = useFetch<SalarySummary[]>(`/salary-summary?month=${month}&year=${year}`, [])
  const totalAmount = rows.reduce((sum, row) => sum + row.totalLabor * laborUnitPrice, 0)

  function viewDetail(row: SalarySummary) {
    session.set('staff', row)
    navigate('/detail-sheet')
  }

  async function saveAll() {
    try {
      await HTTPClient.fetch('/salary-tables', 'POST', {
        month,
        year,
        laborUnitPrice,
        managerID: session.get('manager').userID,
      })
      navigate('/choose-method')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title={`Bảng công tháng ${month}/${year}`}>
      <div className="card">
        <h2>
          Bảng tổng hợp công nhân viên phục vụ &mdash; tháng {month}/{year}
        </h2>

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
            {rows.map((row) => (
              <tr key={row.staffID}>
                <td>{row.employeeCode}</td>
                <td>{row.fullname}</td>
                <td className="num">{row.totalLabor}</td>
                <td className="num">{money(laborUnitPrice)}</td>
                <td className="num">{money(row.totalLabor * laborUnitPrice)}</td>
                <td>
                  <button className="btn sm" id={`btnDetail${row.staffID}`} onClick={() => viewDetail(row)}>
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng quỹ lương tháng: <b id="outTotalAmount">{money(totalAmount)}</b>
        </div>

        <div className="actions">
          <button className="btn" id="btnSaveAll" onClick={saveAll}>
            Lưu bảng công và chọn hình thức trả
          </button>
          <Link className="btn ghost" id="btnBack" to="/choose-month">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
