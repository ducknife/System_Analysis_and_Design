import { Link, useNavigate } from 'react-router-dom'
import { money } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import { PaymentMethod } from '../types'
import type { SalaryTable } from '../types'
import { useFetch } from '../useFetch'

export default function ChooseMethod() {
  const navigate = useNavigate()
  const month = session.get('month')
  const year = session.get('year')
  const [rows, setRows] = useFetch<SalaryTable[]>(`/salary-tables?month=${month}&year=${year}`, [])

  function changeMethod(salaryTableID: number, paymentMethod: string) {
    setRows(rows.map((row) => (row.salaryTableID === salaryTableID ? { ...row, paymentMethod } : row)))
  }

  async function save() {
    try {
      await HTTPClient.fetch(
        '/salary-tables/payment-methods',
        'PUT',
        rows.map((row) => ({
          salaryTableID: row.salaryTableID,
          paymentMethod: row.paymentMethod ?? PaymentMethod.Transfer,
        })),
      )
      navigate('/confirm-received')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Hình thức trả lương">
      <div className="card">
        <h2>
          Chọn hình thức trả lương tháng {month}/{year}
        </h2>

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
            {rows.map((row) => (
              <tr key={row.salaryTableID}>
                <td>{row.employeeCode}</td>
                <td>{row.fullname}</td>
                <td className="num">{money(row.totalLabor * row.laborUnitPrice)}</td>
                <td>
                  <select
                    id={`cboPaymentMethod${row.salaryTableID}`}
                    value={row.paymentMethod ?? PaymentMethod.Transfer}
                    onChange={(event) => changeMethod(row.salaryTableID, event.target.value)}
                  >
                    <option>{PaymentMethod.Transfer}</option>
                    <option>{PaymentMethod.Cash}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <button className="btn" id="btnSaveMethod" onClick={save}>
            Lưu hình thức trả
          </button>
          <Link className="btn ghost" id="btnBack" to="/summary-sheet">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
