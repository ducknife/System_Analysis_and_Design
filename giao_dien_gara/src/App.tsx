import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import ManagerHome from './pages/ManagerHome'

import SearchCustomerInfo from './pages/SearchCustomerInfo'
import AddCustomer from './pages/AddCustomer'
import ServiceSlipInfo from './pages/ServiceSlipInfo'
import SearchService from './pages/SearchService'
import AddComponent from './pages/AddComponent'

import SearchNeededServiceSlip from './pages/SearchNeededServiceSlip'
import StaffList from './pages/StaffList'
import ChooseSlot from './pages/ChooseSlot'

import ChooseMonth from './pages/ChooseMonth'
import SummarySheet from './pages/SummarySheet'
import DetailSheet from './pages/DetailSheet'
import ChooseMethod from './pages/ChooseMethod'
import ConfirmReceived from './pages/ConfirmReceived'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager-home" element={<ManagerHome />} />

      <Route path="/search-customer" element={<SearchCustomerInfo />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/service-slip" element={<ServiceSlipInfo />} />
      <Route path="/search-service" element={<SearchService />} />
      <Route path="/add-component" element={<AddComponent />} />

      <Route path="/search-needed-slip" element={<SearchNeededServiceSlip />} />
      <Route path="/staff-list" element={<StaffList />} />
      <Route path="/choose-slot" element={<ChooseSlot />} />

      <Route path="/choose-month" element={<ChooseMonth />} />
      <Route path="/summary-sheet" element={<SummarySheet />} />
      <Route path="/detail-sheet" element={<DetailSheet />} />
      <Route path="/choose-method" element={<ChooseMethod />} />
      <Route path="/confirm-received" element={<ConfirmReceived />} />
    </Routes>
  )
}
