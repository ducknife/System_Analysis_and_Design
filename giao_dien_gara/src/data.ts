// Du lieu mau dung cho ban demo giao dien. Ban that se lay tu backend qua HTTPClient.

export type Customer = {
  userID: number
  fullname: string
  phone: string
  email: string
  address: string
}

export type Car = {
  carID: number
  licensePlate: string
  brand: string
  model: string
  year: number
}

export type Appointment = {
  appointmentID: number
  time: string
  status: string
  licensePlate: string
}

export type Service = {
  serviceID: number
  name: string
  price: number
  laborContent: number
}

export type Component = {
  componentID: number
  name: string
  price: number
  inventoryQty: number
}

export type ServiceDetail = {
  serviceID: number
  name: string
  price: number
  laborContent: number
  staffName: string | null
}

export type ComponentDetail = {
  componentID: number
  name: string
  qty: number
  price: number
}

export type Slot = {
  slotID: number
  location: string
  status: string
}

export type Staff = {
  userID: number
  employeeCode: string
  fullname: string
  specialization: string
  busy: boolean
}

export type SalaryRow = {
  userID: number
  employeeCode: string
  fullname: string
  totalLabor: number
  amount: number
  isReceived: boolean
}

export const customer: Customer = {
  userID: 7,
  fullname: 'Trần Minh Quân',
  phone: '0912345678',
  email: 'quantm@gmail.com',
  address: 'Số 15, Trần Phú, Hà Đông, Hà Nội',
}

export const cars: Car[] = [
  { carID: 12, licensePlate: '30A-123.45', brand: 'Toyota', model: 'Vios', year: 2019 },
  { carID: 18, licensePlate: '29H-888.11', brand: 'Mazda', model: 'CX-5', year: 2021 },
]

export const appointments: Appointment[] = [
  { appointmentID: 31, time: '21/10/2026 08:30', status: 'Đã xác nhận', licensePlate: '30A-123.45' },
]

export const services: Service[] = [
  { serviceID: 1, name: 'Thay dầu động cơ', price: 350000, laborContent: 1.0 },
  { serviceID: 2, name: 'Thay lọc gió điều hòa', price: 200000, laborContent: 0.5 },
  { serviceID: 3, name: 'Cân chỉnh thước lái', price: 600000, laborContent: 2.0 },
  { serviceID: 4, name: 'Bảo dưỡng phanh trước', price: 450000, laborContent: 1.5 },
]

export const components: Component[] = [
  { componentID: 1, name: 'Dầu động cơ Castrol 4L', price: 780000, inventoryQty: 24 },
  { componentID: 2, name: 'Lọc gió điều hòa Denso', price: 250000, inventoryQty: 15 },
  { componentID: 3, name: 'Má phanh trước Bosch', price: 1150000, inventoryQty: 8 },
  { componentID: 4, name: 'Bugi NGK Iridium', price: 320000, inventoryQty: 0 },
]

export const serviceDetails: ServiceDetail[] = [
  { serviceID: 1, name: 'Thay dầu động cơ', price: 350000, laborContent: 1.0, staffName: null },
  { serviceID: 4, name: 'Bảo dưỡng phanh trước', price: 450000, laborContent: 1.5, staffName: null },
]

export const componentDetails: ComponentDetail[] = [
  { componentID: 1, name: 'Dầu động cơ Castrol 4L', qty: 1, price: 780000 },
  { componentID: 3, name: 'Má phanh trước Bosch', qty: 2, price: 1150000 },
]

export const slots: Slot[] = [
  { slotID: 1, location: 'Khoang A1', status: 'Trống' },
  { slotID: 2, location: 'Khoang A2', status: 'Đang sửa' },
  { slotID: 3, location: 'Khoang B1', status: 'Trống' },
  { slotID: 4, location: 'Khoang B2', status: 'Trống' },
]

export const staffs: Staff[] = [
  { userID: 21, employeeCode: 'NV001', fullname: 'Lê Văn Hoàng', specialization: 'Động cơ', busy: false },
  { userID: 22, employeeCode: 'NV002', fullname: 'Phạm Quốc Đạt', specialization: 'Gầm - Phanh', busy: false },
  { userID: 23, employeeCode: 'NV003', fullname: 'Nguyễn Thị Lan', specialization: 'Điện - Điều hòa', busy: true },
]

export const waitingSlips = [
  { serviceSlipID: 101, licensePlate: '30A-123.45', customer: 'Trần Minh Quân', time: '21/10/2026 08:45', status: 'Chờ phân công' },
  { serviceSlipID: 102, licensePlate: '29H-888.11', customer: 'Trần Minh Quân', time: '21/10/2026 09:10', status: 'Chờ phân công' },
  { serviceSlipID: 103, licensePlate: '30F-567.89', customer: 'Đỗ Thu Hà', time: '21/10/2026 09:30', status: 'Chờ phân công' },
]

export const salaryRows: SalaryRow[] = [
  { userID: 21, employeeCode: 'NV001', fullname: 'Lê Văn Hoàng', totalLabor: 74, amount: 37000000, isReceived: false },
  { userID: 22, employeeCode: 'NV002', fullname: 'Phạm Quốc Đạt', totalLabor: 61, amount: 30500000, isReceived: false },
  { userID: 23, employeeCode: 'NV003', fullname: 'Nguyễn Thị Lan', totalLabor: 52, amount: 26000000, isReceived: false },
]

export const detailRows = [
  { serviceSlipID: 101, licensePlate: '30A-123.45', service: 'Thay dầu động cơ', laborContent: 1.0, finishedAt: '03/10/2026' },
  { serviceSlipID: 104, licensePlate: '30F-567.89', service: 'Cân chỉnh thước lái', laborContent: 2.0, finishedAt: '07/10/2026' },
  { serviceSlipID: 110, licensePlate: '29H-888.11', service: 'Đại tu động cơ', laborContent: 12.0, finishedAt: '15/10/2026' },
]

export const LABOR_UNIT_PRICE = 500000

export function money(n: number): string {
  return n.toLocaleString('vi-VN') + ' đ'
}
