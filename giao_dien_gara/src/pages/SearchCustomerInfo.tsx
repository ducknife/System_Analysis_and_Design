import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dateTime } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { startReceipt } from '../session'
import type { Car, CustomerInfo } from '../types'

const CONFIRMED = 'Đã xác nhận'

export default function SearchCustomerInfo() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [info, setInfo] = useState<CustomerInfo | null>(null)
  const [notFoundMessage, setNotFoundMessage] = useState('')

  async function search(event: FormEvent) {
    event.preventDefault()
    setInfo(null)
    setNotFoundMessage('')
    try {
      setInfo(await HTTPClient.fetch<CustomerInfo>(`/customers/search?phone=${encodeURIComponent(phone)}`))
    } catch (error) {
      setNotFoundMessage((error as Error).message)
    }
  }

  function receive({ customer, appointments }: CustomerInfo, car: Car) {
    const appointment = appointments.find((item) => item.carID === car.carID && item.status === CONFIRMED)
    startReceipt({
      customerID: customer.userID,
      carID: car.carID,
      appointmentDetailID: appointment?.appointmentDetailID ?? null,
    })
    navigate('/service-slip')
  }

  return (
    <Layout title="Tiếp nhận xe">
      <div className="card">
        <h2>Tra cứu khách hàng</h2>
        <form className="row" onSubmit={search}>
          <div style={{ flex: 3 }}>
            <label>Số điện thoại khách hàng</label>
            <input id="txtPhoneSearch" required value={phone} onChange={(event) => setPhone(event.target.value)} />
          </div>
          <div style={{ flex: 1, alignSelf: 'flex-end' }}>
            <button className="btn wide" id="btnSearch">
              Tìm kiếm
            </button>
          </div>
        </form>

        {notFoundMessage && <p className="note error">{notFoundMessage}</p>}

        {info && (
          <>
            <h3>Thông tin khách hàng</h3>
            <table>
              <tbody>
                <tr>
                  <th style={{ width: 160 }}>Họ và tên</th>
                  <td>{info.customer.fullname}</td>
                  <th style={{ width: 120 }}>Điện thoại</th>
                  <td>{info.customer.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{info.customer.email}</td>
                  <th>Địa chỉ</th>
                  <td>{info.customer.address}</td>
                </tr>
              </tbody>
            </table>

            <h3>Danh sách xe của khách</h3>
            <table id="tblCar">
              <thead>
                <tr>
                  <th>Mã xe</th>
                  <th>Biển số</th>
                  <th>Hãng</th>
                  <th>Dòng xe</th>
                  <th className="num">Năm SX</th>
                  <th style={{ width: 110 }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {info.cars.map((car) => (
                  <tr key={car.carID}>
                    <td>{car.carID}</td>
                    <td>{car.licensePlate}</td>
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td className="num">{car.year}</td>
                    <td>
                      <button className="btn sm" id={`btnReceive${car.carID}`} onClick={() => receive(info, car)}>
                        Tiếp nhận
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Lịch hẹn đã đặt</h3>
            <table id="tblAppointment">
              <thead>
                <tr>
                  <th>Mã lịch hẹn</th>
                  <th>Thời gian hẹn</th>
                  <th>Biển số</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {info.appointments.map((appointment) => (
                  <tr key={appointment.appointmentDetailID}>
                    <td>{appointment.appointmentID}</td>
                    <td>{dateTime(appointment.time)}</td>
                    <td>{appointment.licensePlate}</td>
                    <td>
                      <span className="tag ok">{appointment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div className="actions">
          <Link className="btn" id="btnAddCustomer" to="/add-customer">
            Thêm khách hàng mới
          </Link>
          <Link className="btn ghost" id="btnBack" to="/manager-home">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
