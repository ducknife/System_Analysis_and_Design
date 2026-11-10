import { Navigate, Outlet } from 'react-router-dom'
import { session } from './session'

export default function RequireManager() {
  return session.get('manager') ? <Outlet /> : <Navigate to="/" replace />
}
