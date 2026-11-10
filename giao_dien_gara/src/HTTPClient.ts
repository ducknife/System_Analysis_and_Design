const SERVER_ERROR = 'Không kết nối được tới máy chủ'

export class HTTPClient {
  static async fetch<T = void>(path: string, method = 'GET', body?: unknown): Promise<T> {
    const response = await fetch(`/api${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.message ?? SERVER_ERROR)
    }

    return response.status === 204 ? (undefined as T) : response.json()
  }
}
