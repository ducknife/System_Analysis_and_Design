import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HTTPClient } from '../HTTPClient'
import { session } from '../session'
import { showError } from '../showError'
import type { Manager } from '../types'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function login(event: FormEvent) {
    event.preventDefault()
    try {
      const manager = await HTTPClient.fetch<Manager>('/login', 'POST', { username, password })
      session.set('manager', manager)
      navigate('/manager-home')
    } catch (error) {
      showError(error)
    }
  }

  return (
    <div className="login-wrap">
      <form className="card" onSubmit={login}>
        <h2>Đăng nhập hệ thống gara</h2>
        <div style={{ marginBottom: 14 }}>
          <label>Tên đăng nhập</label>
          <input
            id="txtUsername"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label>Mật khẩu</label>
          <input
            id="txtPassword"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="btn wide" id="btnLogin">
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
