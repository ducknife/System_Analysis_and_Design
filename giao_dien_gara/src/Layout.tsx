import { ReactNode } from 'react'
import { session } from './session'

type Props = {
  title: string
  children: ReactNode
}

export default function Layout({ title, children }: Props) {
  return (
    <>
      <div className="topbar">
        <h1>Hệ thống quản lý gara ô tô &mdash; {title}</h1>
        <span className="who">Quản lý: {session.get('manager').fullname}</span>
      </div>
      <div className="page">{children}</div>
    </>
  )
}
