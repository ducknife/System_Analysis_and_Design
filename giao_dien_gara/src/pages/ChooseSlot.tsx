import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { slipCode } from '../format'
import { HTTPClient } from '../HTTPClient'
import Layout from '../Layout'
import { session } from '../session'
import { showError } from '../showError'
import type { Slot } from '../types'

const AVAILABLE = 'Trống'

export default function ChooseSlot() {
  const navigate = useNavigate()
  const serviceSlipID = session.get('serviceSlipID')
  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedSlotID, setSelectedSlotID] = useState<number | null>(null)

  useEffect(() => {
    HTTPClient.fetch<Slot[]>('/slots')
      .then((found) => {
        if (found.some((slot) => slot.status === AVAILABLE)) {
          setSlots(found)
          return
        }
        alert('Hiện không còn slot kỹ thuật trống, vui lòng chờ')
        navigate('/staff-list')
      })
      .catch(showError)
  }, [navigate])

  async function save() {
    try {
      await HTTPClient.fetch(`/service-slips/${serviceSlipID}/slot`, 'PUT', {
        slotID: selectedSlotID,
        managerID: session.get('manager').userID,
      })
      session.remove('serviceSlipID')
      alert('Phân công thành công')
      navigate('/search-needed-slip')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <Layout title="Chọn khoang sửa chữa">
      <div className="card">
        <h2>Khoang sửa chữa cho phiếu {slipCode(serviceSlipID)}</h2>

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
            {slots.map((slot) => (
              <tr key={slot.slotID}>
                <td>{slot.slotID}</td>
                <td>{slot.location}</td>
                <td>
                  <span className={`tag ${slot.status === AVAILABLE ? 'ok' : 'busy'}`}>{slot.status}</span>
                </td>
                <td>
                  <button
                    className={`btn sm ${slot.slotID === selectedSlotID ? '' : 'ghost'}`}
                    id={`btnChoose${slot.slotID}`}
                    disabled={slot.status !== AVAILABLE}
                    onClick={() => setSelectedSlotID(slot.slotID)}
                  >
                    {slot.slotID === selectedSlotID ? 'Đã chọn' : 'Chọn'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="actions">
          <button className="btn" id="btnSave" disabled={selectedSlotID === null} onClick={save}>
            Lưu phân công
          </button>
          <Link className="btn ghost" id="btnBack" to="/staff-list">
            Quay lại
          </Link>
        </div>
      </div>
    </Layout>
  )
}
