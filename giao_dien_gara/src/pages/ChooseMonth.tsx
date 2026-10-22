import { Link } from 'react-router-dom'
import Layout from '../Layout'

export default function ChooseMonth() {
  return (
    <Layout title="Tính công trả lương">
      <div className="card">
        <h2>Chọn kỳ tính lương</h2>
        <div className="row">
          <div>
            <label>Tháng</label>
            <select id="txtMonth" defaultValue="10">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  Tháng {m}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Năm</label>
            <select id="txtYear" defaultValue="2026">
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
          <div>
            <label>Đơn giá một công</label>
            <input id="txtLaborUnitPrice" defaultValue="500.000 đ" />
          </div>
        </div>

        <div className="actions">
          <Link className="btn" id="btnView" to="/summary-sheet">
            Xem bảng công
          </Link>
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
