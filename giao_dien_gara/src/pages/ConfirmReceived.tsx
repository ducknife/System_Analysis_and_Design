import { Link, useNavigate } from 'react-router-dom'
import { money } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import { PaymentMethod } from '../types'
import type { SalaryTable } from '../types'
import { useFetch } from '../useFetch'

const isReceived = (row: SalaryTable) => row.isReceived || row.paymentMethod === PaymentMethod.Transfer

export default function ConfirmReceived() {
  const navigate = useNavigate()
  const month = session.get('month')
  const year = session.get('year')
  const [rows, setRows] = useFetch<SalaryTable[]>(`/salary-tables?month=${month}&year=${year}`, [])

  function toggleReceived(salaryTableID: number, checked: boolean) {
    setRows(rows.map((row) => (row.salaryTableID === salaryTableID ? { ...row, isReceived: checked } : row)))
  }

  async function confirm() {
    try {
      await HTTPClient.fetch(
        '/salary-tables/received',
        'PUT',
        rows.map((row) => ({ salaryTableID: row.salaryTableID, isReceived: isReceived(row) })),
      )
      alert('Tính lương thành công')
      navigate('/manager-home')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Xác nhận đã nhận lương">
      <div className="card">
        <h2>
          Xác nhận nhân viên đã nhận lương tháng {month}/{year}
        </h2>

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
            {rows.map((row) => (
              <tr key={row.salaryTableID}>
                <td>{row.employeeCode}</td>
                <td>{row.fullname}</td>
                <td className="num">{money(row.totalLabor * row.laborUnitPrice)}</td>
                <td>{row.paymentMethod}</td>
                <td>
                  <input
                    id={`chkIsReceived${row.salaryTableID}`}
                    type="checkbox"
                    style={{ width: 16 }}
                    checked={isReceived(row)}
                    disabled={row.paymentMethod === PaymentMethod.Transfer}
                    onChange={(event) => toggleReceived(row.salaryTableID, event.target.checked)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <button className="btn" id="btnConfirm" onClick={confirm}>
            Xác nhận và kết thúc
          </button>
          <Link className="btn ghost" id="btnBack" to="/choose-method">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
