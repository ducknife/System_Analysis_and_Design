import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { money } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { Component } from '../types'
import { useFetch } from '../useFetch'

export default function AddComponent() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [components, setComponents] = useFetch<Component[]>('/components?keyword=', [])
  const [quantities, setQuantities] = useState<Record<number, number>>({})

  async function search(event: FormEvent) {
    event.preventDefault()
    try {
      setComponents(await HTTPClient.fetch<Component[]>(`/components?keyword=${encodeURIComponent(keyword)}`))
    } catch (error) {
      showError(error)
    }
  }

  async function add(componentID: number) {
    try {
      await HTTPClient.fetch(`/service-slips/${session.get('serviceSlipID')}/components`, 'POST', {
        componentID,
        qty: quantities[componentID] ?? 1,
      })
      navigate('/service-slip')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Chọn phụ tùng">
      <div className="card">
        <h2>Tìm phụ tùng</h2>
        <form className="row" onSubmit={search}>
          <div style={{ flex: 3 }}>
            <label>Từ khóa tên phụ tùng</label>
            <input id="txtComponentKeyword" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </form>

        <table id="tblComponent">
          <thead>
            <tr>
              <th>Mã PT</th>
              <th>Tên phụ tùng</th>
              <th className="num">Đơn giá</th>
              <th className="num">Tồn kho</th>
              <th style={{ width: 90 }}>Số lượng</th>
              <th style={{ width: 90 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.componentID}>
                <td>{component.componentID}</td>
                <td>{component.name}</td>
                <td className="num">{money(component.price)}</td>
                <td className="num">
                  {component.inventoryQty > 0 ? component.inventoryQty : <span className="tag busy">Hết hàng</span>}
                </td>
                <td>
                  <input
                    id={`txtQty${component.componentID}`}
                    type="number"
                    min={1}
                    max={component.inventoryQty}
                    disabled={component.inventoryQty === 0}
                    value={quantities[component.componentID] ?? 1}
                    onChange={(event) =>
                      setQuantities({ ...quantities, [component.componentID]: Number(event.target.value) })
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn sm"
                    id={`btnAdd${component.componentID}`}
                    disabled={component.inventoryQty === 0}
                    onClick={() => add(component.componentID)}
                  >
                    Thêm
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
