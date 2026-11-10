import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { Service } from '../types'

export default function SearchService() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [services, setServices] = useState<Service[]>([])

  async function search(event: FormEvent) {
    event.preventDefault()
    try {
      setServices(await HTTPClient.fetch<Service[]>(`/services?keyword=${encodeURIComponent(keyword)}`))
    } catch (error) {
      showError(error)
    }
  }

  async function choose(serviceID: number) {
    try {
      await HTTPClient.fetch(`/service-slips/${session.get('serviceSlipID')}/services`, 'POST', { serviceID })
      navigate('/service-slip')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Chọn dịch vụ">
      <div className="card">
        <h2>Tìm dịch vụ</h2>
        <form className="row" onSubmit={search}>
          <div style={{ flex: 3 }}>
            <label>Từ khóa tên dịch vụ</label>
            <input id="txtServiceKeyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </form>

        <table id="tblService">
          <thead>
            <tr>
              <th>Mã DV</th>
              <th>Tên dịch vụ</th>
              <th className="num">Định mức công</th>
              <th className="num">Đơn giá</th>
              <th style={{ width: 90 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.serviceID}>
                <td>{service.serviceID}</td>
                <td>{service.name}</td>
                <td className="num">{service.laborContent.toFixed(1)}</td>
                <td className="num">{money(service.price)}</td>
                <td>
                  <button
                    className="btn sm"
                    id={`btnChoose${service.serviceID}`}
                    onClick={() => choose(service.serviceID)}
                  >
                    Chọn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/service-slip">
            Quay lại phiếu dịch vụ
          </Link>
        </div>
      </div>
    </Layout>
  )
}
