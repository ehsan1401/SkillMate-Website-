'use client'

import { API } from '@/utils/Api'
import { useState } from 'react'

export default function ProtectedDataButton() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const getProtectedData = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      const res = await fetch(API.user.info, {
        method: 'GET',
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Unauthorized or request failed')
      }

      const result = await res.json()
      setData(result)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4 mt-20">
      <button
        onClick={getProtectedData}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Loading...' : 'Get Protected Data'}
      </button>

      {error && (
        <div className="text-red-500 font-medium">
          ❌ {error}
        </div>
      )}

      {data && (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm max-w-lg overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
