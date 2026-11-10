import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { startReceipt } from '../session'
import { showError } from '../showError'
import type { NewCustomer } from '../types'

export default function AddCustomer() {
  const navigate = useNavigate()

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const { licensePlate, brand, model, year, ...customer } = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const created = await HTTPClient.fetch<NewCustomer>('/customers', 'POST', {
        customer,
        car: { licensePlate, brand, model, year: Number(year) },
      })
      startReceipt({ customerID: created.customer.userID, carID: created.car.carID, appointmentDetailID: null })
      navigate('/service-slip')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Thêm khách hàng mới">
      <form className="card" onSubmit={save}>
        <h2>Thông tin khách hàng</h2>
        <div className="row">
          <div>
            <label>Họ và tên</label>
            <input id="txtFullname" name="fullname" required />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input id="txtPhone" name="phone" required />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Email</label>
            <input id="txtEmail" name="email" type="email" required />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input id="txtAddress" name="address" required />
          </div>
        </div>

        <h2 style={{ marginTop: 22 }}>Thông tin xe</h2>
        <div className="row">
          <div>
            <label>Biển số xe</label>
            <input id="txtLicensePlate" name="licensePlate" required />
          </div>
          <div>
            <label>Hãng xe</label>
            <input id="txtBrand" name="brand" required />
          </div>
        </div>
        <div className="row">
          <div>
            <label>Dòng xe</label>
            <input id="txtModel" name="model" required />
          </div>
          <div>
            <label>Năm sản xuất</label>
            <input id="txtYear" name="year" type="number" required />
          </div>
        </div>

        <div className="actions">
          <button className="btn" id="btnSave">
            Lưu và tiếp nhận
          </button>
          <Link className="btn ghost" id="btnBack" to="/search-customer">
            Quay lại
          </Link>
        </div>
      </form>
    </Layout>
  )
}
