import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { components, money } from '../data'

export default function AddComponent() {
  return (
    <Layout title="Chọn phụ tùng">
      <div className="card">
        <h2>Tìm phụ tùng</h2>
        <div className="row">
          <div style={{ flex: 3 }}>
            <label>Từ khóa tên phụ tùng</label>
            <input id="txtComponentKeyword" defaultValue="lọc" />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </div>

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
            {components.map((c) => (
              <tr key={c.componentID}>
                <td>{c.componentID}</td>
                <td>{c.name}</td>
                <td className="num">{money(c.price)}</td>
                <td className="num">
                  {c.inventoryQty > 0 ? (
                    c.inventoryQty
                  ) : (
                    <span className="tag busy">Hết hàng</span>
                  )}
                </td>
                <td>
                  <input defaultValue="1" disabled={c.inventoryQty === 0} />
                </td>
                <td>
                  <button className="btn sm" disabled={c.inventoryQty === 0}>
                    Thêm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          Phụ tùng hết hàng trong kho sẽ bị khóa, không thêm được vào phiếu dịch vụ.
        </p>

        <div className="actions">
          <Link className="btn ghost" id="btnBack" to="/service-slip">
            Quay lại phiếu dịch vụ
          </Link>
        </div>
      </div>
    </Layout>
  )
}
