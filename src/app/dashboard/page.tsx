'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/supabaseClient'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

    if (currentUser) {
      setUser(currentUser)
    } else {
      router.push('/auth/login')
    }
		
		setLoading(false)
	}
    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  if (loading) {
    return <div className="text-center mt-10">Завантаження...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-xl mx-auto p-8 border mt-10 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Вітаю на дешборді, друже!</h1>

      <div className="space-y-3">
        <p>
          <strong>ID Користувача (UUID):</strong>
        </p>
        <p className="p-2 bg-gray-100 rounded break-all">{user.id}</p>

        <p>
          <strong>Email:</strong>
        </p>
        <p className="p-2 bg-gray-100 rounded">{user.email}</p>

        <p className="text-sm text-gray-500 pt-2">А пуроль не покажу.</p>
      </div>

      <button onClick={handleLogout} className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Вийти
      </button>
    </div>
  )
}
