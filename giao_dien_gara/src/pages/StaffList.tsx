import { Link, useNavigate } from 'react-router-dom'
import { slipCode } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { ServiceSlip, Staff } from '../types'
import { useFetch } from '../useFetch'

export default function StaffList() {
  const navigate = useNavigate()
  const slipPath = `/service-slips/${session.get('serviceSlipID')}`
  const [slip, setSlip] = useFetch<ServiceSlip | null>(slipPath, null)
  const [staffs] = useFetch<Staff[]>('/staffs', [])

  if (!slip) {
    return null
  }

  const chooseStaff = async (serviceID: number, value: string) => {
    const staffID = value ? Number(value) : null
    try {
      await HTTPClient.fetch(`${slipPath}/services/${serviceID}/staff`, 'PUT', { staffID })
      setSlip({
        ...slip,
        serviceDetails: slip.serviceDetails.map((detail) =>
          detail.serviceID === serviceID ? { ...detail, staffID } : detail,
        ),
      })
    } catch (error) {
      showError(error)
    }
  }

  const goToChooseSlot = () => {
    if (slip.serviceDetails.some((detail) => detail.staffID === null)) {
      alert('Vui lòng chọn nhân viên cho tất cả dịch vụ trong phiếu trước khi xác nhận')
      return
    }
    navigate('/choose-slot')
  }

  return (
    <Layout title="Chọn nhân viên phục vụ">
      <div className="card">
        <h2>
          Phân công cho phiếu {slipCode(slip.serviceSlipID)} &mdash; {slip.car.licensePlate}
        </h2>

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
            {slip.serviceDetails.map((detail) => (
              <tr key={detail.serviceID}>
                <td>{detail.serviceID}</td>
                <td>{detail.name}</td>
                <td className="num">{detail.laborContent.toFixed(1)}</td>
                <td>
                  <select
                    id={`cboStaff${detail.serviceID}`}
                    value={detail.staffID ?? ''}
                    onChange={(event) => chooseStaff(detail.serviceID, event.target.value)}
                  >
                    <option value="">-- Chọn nhân viên --</option>
                    {staffs
                      .filter((staff) => !staff.busy || staff.userID === detail.staffID)
                      .map((staff) => (
                        <option key={staff.userID} value={staff.userID}>
                          {staff.employeeCode} &mdash; {staff.fullname}
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
            {staffs.map((staff) => (
              <tr key={staff.userID}>
                <td>{staff.employeeCode}</td>
                <td>{staff.fullname}</td>
                <td>{staff.specialization}</td>
                <td>
                  {staff.busy ? (
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
          <button className="btn" id="btnNext" onClick={goToChooseSlot}>
            Tiếp tục chọn khoang sửa
          </button>
          <Link className="btn ghost" id="btnBack" to="/search-needed-slip">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
