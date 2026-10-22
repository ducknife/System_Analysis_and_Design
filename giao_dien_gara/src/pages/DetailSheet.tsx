import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { LABOR_UNIT_PRICE, detailRows, money } from '../data'

export default function DetailSheet() {
  const tongCong = detailRows.reduce((s, r) => s + r.laborContent, 0)
  return (
    <Layout title="Chi tiết công nhân viên">
      <div className="card">
        <h2>Chi tiết công &mdash; NV001 Lê Văn Hoàng &mdash; tháng 10/2026</h2>

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
            {detailRows.map((r, i) => (
              <tr key={i}>
                <td>{r.serviceSlipID}</td>
                <td>{r.licensePlate}</td>
                <td>{r.service}</td>
                <td className="num">{r.laborContent.toFixed(1)}</td>
                <td>{r.finishedAt}</td>
              </tr>
            ))}
            <tr>
              <th colSpan={3}>Tổng cộng các dòng hiển thị</th>
              <th className="num">{tongCong.toFixed(1)}</th>
              <th />
            </tr>
          </tbody>
        </table>

        <div className="total">
          Tổng công cả tháng: <b>74</b> &times; {money(LABOR_UNIT_PRICE)} = <b>{money(37000000)}</b>
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
