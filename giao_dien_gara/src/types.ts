export const PaymentMethod = {
  Transfer: 'Chuyển khoản',
  Cash: 'Tiền mặt',
} as const

export type Manager = {
  userID: number
  employeeCode: string
  fullname: string
}

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
  appointmentDetailID: number
  carID: number
  licensePlate: string
  time: string
  status: string
}

export type CustomerInfo = {
  customer: Customer
  cars: Car[]
  appointments: Appointment[]
}

export type NewCustomer = {
  customer: Customer
  car: Car
}

export type Receipt = {
  customerID: number
  carID: number
  appointmentDetailID: number | null
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
  staffID: number | null
}

export type ComponentDetail = {
  componentID: number
  name: string
  qty: number
  price: number
}

export type ServiceSlip = {
  serviceSlipID: number
  time: string
  status: string
  customer: Customer
  car: Car
  serviceDetails: ServiceDetail[]
  componentDetails: ComponentDetail[]
}

export type Staff = {
  userID: number
  employeeCode: string
  fullname: string
  specialization: string
  busy: boolean
}

export type Slot = {
  slotID: number
  location: string
  status: string
}

export type SalarySummary = {
  staffID: number
  employeeCode: string
  fullname: string
  totalLabor: number
}

export type StaffWork = {
  serviceSlipID: number
  serviceID: number
  licensePlate: string
  serviceName: string
  laborContent: number
  finishedAt: string
}

export type SalaryTable = {
  salaryTableID: number
  employeeCode: string
  fullname: string
  laborUnitPrice: number
  totalLabor: number
  paymentMethod: string | null
  isReceived: boolean
}
