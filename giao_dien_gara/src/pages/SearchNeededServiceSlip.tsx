import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dateTime, slipCode } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { ServiceSlip } from '../types'
import { useFetch } from '../useFetch'

export default function SearchNeededServiceSlip() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [slips, setSlips] = useFetch<ServiceSlip[]>('/service-slips?keyword=', [])

  async function search(event: FormEvent) {
    event.preventDefault()
    try {
      const found = await HTTPClient.fetch<ServiceSlip[]>(`/service-slips?keyword=${encodeURIComponent(keyword)}`)
      if (!found.length) {
        alert('Không tìm thấy phiếu dịch vụ')
        return
      }
      setSlips(found)
    } catch (error) {
      showError(error)
    }
  }

  function assign(serviceSlipID: number) {
    session.set('serviceSlipID', serviceSlipID)
    navigate('/staff-list')
  }

  return (
    <Layout title="Phân công nhân viên">
      <div className="card">
        <h2>Phiếu dịch vụ chờ phân công</h2>
        <form className="row" onSubmit={search}>
          <div style={{ flex: 3 }}>
            <label>Từ khóa mã phiếu, biển số hoặc tên khách hàng</label>
            <input
              id="txtSlipKeyword"
              placeholder="Để trống để xem tất cả"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </form>

        <table id="tblServiceSlip">
          <thead>
            <tr>
              <th>Mã phiếu</th>
              <th>Biển số</th>
              <th>Khách hàng</th>
              <th>Thời gian tiếp nhận</th>
              <th>Trạng thái</th>
              <th style={{ width: 110 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {slips.map((slip) => (
              <tr key={slip.serviceSlipID}>
                <td>{slipCode(slip.serviceSlipID)}</td>
                <td>{slip.car.licensePlate}</td>
                <td>{slip.customer.fullname}</td>
                <td>{dateTime(slip.time)}</td>
                <td>
                  <span className="tag wait">{slip.status}</span>
                </td>
                <td>
                  <button
                    className="btn sm"
                    id={`btnAssign${slip.serviceSlipID}`}
                    onClick={() => assign(slip.serviceSlipID)}
                  >
                    Phân công
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
