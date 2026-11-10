import { Link } from 'react-router-dom'
import { date, money, slipCode } from '../format'
import Layout from '../Layout'
import { session } from '../session'
import type { StaffWork } from '../types'
import { useFetch } from '../useFetch'

export default function DetailSheet() {
  const month = session.get('month')
  const year = session.get('year')
  const laborUnitPrice = session.get('laborUnitPrice')
  const staff = session.get('staff')
  const [works] = useFetch<StaffWork[]>(`/staffs/${staff.staffID}/service-details?month=${month}&year=${year}`, [])
  const totalLabor = works.reduce((sum, work) => sum + work.laborContent, 0)

  return (
    <Layout title="Chi tiết công nhân viên">
      <div className="card">
        <h2>
          Chi tiết công &mdash; {staff.employeeCode} {staff.fullname} &mdash; tháng {month}/{year}
        </h2>

        <table id="tblServiceDetail">
          <thead>
            <tr>
              <th>Mã phiếu</th>
              <th>Biển số</th>
              <th>Dịch vụ đã làm</th>
              <th className="num">Định mức công</th>
              <th>Ngày hoàn thành</th>
            </tr>
          </thead>
          <tbody>
            {works.map((work) => (
              <tr key={`${work.serviceSlipID}-${work.serviceID}`}>
                <td>{slipCode(work.serviceSlipID)}</td>
                <td>{work.licensePlate}</td>
                <td>{work.serviceName}</td>
                <td className="num">{work.laborContent.toFixed(1)}</td>
                <td>{date(work.finishedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng công cả tháng: <b id="outTotalLabor">{totalLabor}</b> &times; {money(laborUnitPrice)} ={' '}
          <b>{money(totalLabor * laborUnitPrice)}</b>
        </div>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/summary-sheet">
            Quay lại bảng công
          </Link>
        </div>
      </div>
    </Layout>
  )
}
