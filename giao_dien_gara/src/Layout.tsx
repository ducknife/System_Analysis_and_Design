import { ReactNode } from 'react'

type Props = {
  title: string
  who?: string
  children: ReactNode
}

export default function Layout({ title, who = 'Quản lý: Nguyễn Văn Hùng', children }: Props) {
  return (
    <>
      <div className="topbar">
        <h1>Hệ thống quản lý gara ô tô &mdash; {title}</h1>
        <span className="who">{who}</span>
      </div>
      <div className="page">{children}</div>
    </>
  )
}
