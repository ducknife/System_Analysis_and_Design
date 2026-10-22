import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="login-wrap">
      <div className="card">
        <h2>Đăng nhập hệ thống gara</h2>
        <div style={{ marginBottom: 14 }}>
          <label>Tên đăng nhập</label>
          <input id="txtUsername" defaultValue="hungnv" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Mật khẩu</label>
          <input id="txtPassword" type="password" defaultValue="123456" />
        </div>
        <Link className="btn wide" id="btnLogin" to="/manager-home" style={{ textAlign: 'center' }}>
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
