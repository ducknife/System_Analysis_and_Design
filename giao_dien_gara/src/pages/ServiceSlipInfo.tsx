import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dateTime, money, slipCode } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { ServiceSlip } from '../types'

async function openServiceSlip() {
  const serviceSlipID = session.get('serviceSlipID')
  if (serviceSlipID) {
    return HTTPClient.fetch<ServiceSlip>(`/service-slips/${serviceSlipID}`)
  }
  const created = await HTTPClient.fetch<ServiceSlip>('/service-slips', 'POST', {
    ...session.get('receipt'),
    managerID: session.get('manager').userID,
  })
  session.set('serviceSlipID', created.serviceSlipID)
  return created
}

export default function ServiceSlipInfo() {
  const navigate = useNavigate()
  const [slip, setSlip] = useState<ServiceSlip | null>(null)

  useEffect(() => {
    openServiceSlip().then(setSlip).catch(showError)
  }, [])

  if (!slip) {
    return null
  }

  const slipPath = `/service-slips/${slip.serviceSlipID}`
  const serviceCost = slip.serviceDetails.reduce((sum, detail) => sum + detail.price, 0)
  const componentCost = slip.componentDetails.reduce((sum, detail) => sum + detail.qty * detail.price, 0)

  const removeLine = async (linePath: string) => {
    try {
      await HTTPClient.fetch(`${slipPath}/${linePath}`, 'DELETE')
      setSlip(await HTTPClient.fetch<ServiceSlip>(slipPath))
    } catch (error) {
      showError(error)
    }
  }

  const save = async () => {
    try {
      await HTTPClient.fetch(`${slipPath}/save`, 'PUT')
      session.remove('serviceSlipID', 'receipt')
      alert('Thêm phiếu dịch vụ thành công')
      navigate('/manager-home')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Phiếu dịch vụ">
      <div className="card">
        <h2>Phiếu dịch vụ {slipCode(slip.serviceSlipID)}</h2>
        <table>
          <tbody>
            <tr>
              <th style={{ width: 150 }}>Khách hàng</th>
              <td>{slip.customer.fullname}</td>
              <th style={{ width: 130 }}>Điện thoại</th>
              <td>{slip.customer.phone}</td>
            </tr>
            <tr>
              <th>Xe tiếp nhận</th>
              <td>
                {slip.car.licensePlate} &mdash; {slip.car.brand} {slip.car.model}
              </td>
              <th>Thời gian</th>
              <td>{dateTime(slip.time)}</td>
            </tr>
          </tbody>
        </table>

        <h3>Dịch vụ đã chọn</h3>
        <table id="tblServiceDetail">
          <thead>
            <tr>
              <th>Mã DV</th>
              <th>Tên dịch vụ</th>
              <th className="num">Định mức công</th>
              <th className="num">Đơn giá</th>
              <th style={{ width: 70 }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {slip.serviceDetails.map((detail) => (
              <tr key={detail.serviceID}>
                <td>{detail.serviceID}</td>
                <td>{detail.name}</td>
                <td className="num">{detail.laborContent.toFixed(1)}</td>
                <td className="num">{money(detail.price)}</td>
                <td>
                  <button
                    className="btn sm ghost"
                    id={`btnDeleteService${detail.serviceID}`}
                    onClick={() => removeLine(`services/${detail.serviceID}`)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Phụ tùng đã chọn</h3>
        <table id="tblComponentDetail">
          <thead>
            <tr>
              <th>Mã PT</th>
              <th>Tên phụ tùng</th>
              <th className="num">Số lượng</th>
              <th className="num">Đơn giá</th>
              <th className="num">Thành tiền</th>
              <th style={{ width: 70 }}>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {slip.componentDetails.map((detail) => (
              <tr key={detail.componentID}>
                <td>{detail.componentID}</td>
                <td>{detail.name}</td>
                <td className="num">{detail.qty}</td>
                <td className="num">{money(detail.price)}</td>
                <td className="num">{money(detail.qty * detail.price)}</td>
                <td>
                  <button
                    className="btn sm ghost"
                    id={`btnDeleteComponent${detail.componentID}`}
                    onClick={() => removeLine(`components/${detail.componentID}`)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total">
          Tổng chi phí tạm tính: <b id="outTotalCost">{money(serviceCost + componentCost)}</b>
        </div>

        <div className="actions">
          <Link className="btn" id="btnAddService" to="/search-service">
            Thêm dịch vụ
          </Link>
          <Link className="btn" id="btnAddComponent" to="/add-component">
            Thêm phụ tùng
          </Link>
          <button className="btn ghost" id="btnSave" disabled={!slip.serviceDetails.length} onClick={save}>
            Lưu phiếu
          </button>
        </div>
      </div>
    </Layout>
  )
}
