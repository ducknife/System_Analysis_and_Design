import { Link } from 'react-router-dom'
import Layout from '../Layout'
import { slots } from '../data'

export default function ChooseSlot() {
  return (
    <Layout title="Chọn khoang sửa chữa">
      <div className="card">
        <h2>Khoang sửa chữa cho xe 30A-123.45</h2>

        <table id="tblSlot">
          <thead>
            <tr>
              <th>Mã khoang</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
              <th style={{ width: 110 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((s) => (
              <tr key={s.slotID}>
                <td>{s.slotID}</td>
                <td>{s.location}</td>
                <td>
                  {s.status === 'Trống' ? (
                    <span className="tag ok">Trống</span>
                  ) : (
                    <span className="tag busy">Đang sửa</span>
                  )}
                </td>
                <td>
                  <button className="btn sm" disabled={s.status !== 'Trống'}>
                    Chọn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="note">
          Khoang đang có xe sửa sẽ bị khóa, không thể xếp thêm xe khác vào cùng khoang.
        </p>

        <div className="actions">
          <Link className="btn" id="btnSave" to="/search-needed-slip">
            Lưu phân công
          </Link>
          <Link className="btn ghost" id="btnBack" to="/staff-list">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
