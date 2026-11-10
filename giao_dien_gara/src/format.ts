export const money = (amount: number) => `${amount.toLocaleString('vi-VN')} đ`

export const slipCode = (id: number) => `PDV${String(id).padStart(6, '0')}`

export const dateTime = (value: string) => new Date(value).toLocaleString('vi-VN')

export const date = (value: string) => new Date(value).toLocaleDateString('vi-VN')
