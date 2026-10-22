import { Link } from 'react-router-dom'
import Layout from '../Layout'

export default function AddCustomer() {
  return (
    <Layout title="Thêm khách hàng mới">
      <div className="card">
        <h2>Thông tin khách hàng</h2>
        <div className="row">
          <div>
            <label>Họ và tên</label>
            <input id="txtFullname" defaultValue="Đỗ Thu Hà" />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input id="txtPhone" defaultValue="0987654321" />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Email</label>
            <input id="txtEmail" defaultValue="hadt@gmail.com" />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input id="txtAddress" defaultValue="Số 8, Cầu Giấy, Hà Nội" />
          </div>
        </div>

        <h2 style={{ marginTop: 22 }}>Thông tin xe</h2>
        <div className="row">
          <div>
            <label>Biển số xe</label>
            <input id="txtLicensePlate" defaultValue="30F-567.89" />
          </div>
          <div>
            <label>Hãng xe</label>
            <input id="txtBrand" defaultValue="Honda" />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Dòng xe</label>
            <input id="txtModel" defaultValue="City" />
          </div>
          <div>
            <label>Năm sản xuất</label>
            <input id="txtYear" defaultValue="2022" />
          </div>
        </div>

        <div className="actions">
          <Link className="btn" id="btnSave" to="/service-slip">
            Lưu và tiếp nhận
          </Link>
          <Link className="btn ghost" id="btnBack" to="/search-customer">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
