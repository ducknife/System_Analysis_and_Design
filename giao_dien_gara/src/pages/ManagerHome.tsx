import { Link } from 'react-router-dom'
import Layout from '../Layout'

export default function ManagerHome() {
  return (
    <Layout title="Trang chủ quản lý">
      <div className="card">
        <h2>Chọn chức năng</h2>
        <div className="menu">
          <Link id="btnReceiveCar" to="/search-customer">
            Tiếp nhận xe và chọn
            <br />
            dịch vụ / phụ tùng
          </Link>
          <Link id="btnAssignStaff" to="/search-needed-slip">
            Phân công
            <br />
            nhân viên phục vụ
          </Link>
          <Link id="btnSalary" to="/choose-month">
            Tính công trả lương
            <br />
            theo tháng
          </Link>
        </div>
        <div className="actions">
          <Link className="btn ghost" id="btnLogout" to="/">
            Đăng xuất
          </Link>
        </div>
      </div>
    </Layout>
  )
}
