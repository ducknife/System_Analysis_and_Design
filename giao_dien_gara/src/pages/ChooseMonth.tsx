import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'

const today = new Date()
const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1)
const YEARS = [today.getFullYear() - 1, today.getFullYear()]

export default function ChooseMonth() {
  const navigate = useNavigate()
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [year, setYear] = useState(today.getFullYear())
  const [laborUnitPrice, setLaborUnitPrice] = useState(500000)

  async function view(event: FormEvent) {
    event.preventDefault()
    try {
      const calculated = await HTTPClient.fetch<boolean>(`/salary-tables/check?month=${month}&year=${year}`)
      if (calculated) {
        alert('Tháng lương đã được tính, vui lòng chọn lại')
        return
      }
      session.set('month', month)
      session.set('year', year)
      session.set('laborUnitPrice', laborUnitPrice)
      navigate('/summary-sheet')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Tính công trả lương">
      <form className="card" onSubmit={view}>
        <h2>Chọn kỳ tính lương</h2>
        <div className="row">
          <div>
            <label>Tháng</label>
            <select id="txtMonth" value={month} onChange={(event) => setMonth(Number(event.target.value))}>
              {MONTHS.map((value) => (
                <option key={value} value={value}>
                  Tháng {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Năm</label>
            <select id="txtYear" value={year} onChange={(event) => setYear(Number(event.target.value))}>
              {YEARS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Đơn giá một công</label>
            <input
              id="txtLaborUnitPrice"
              type="number"
              min={1}
              required
              value={laborUnitPrice}
              onChange={(event) => setLaborUnitPrice(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="actions">
          <button className="btn" id="btnView">
            Xem bảng công
          </button>
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </form>
    </Layout>
  )
}
